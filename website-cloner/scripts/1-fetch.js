#!/usr/bin/env node

/**
 * Step 1: Fetch Reference Website
 *
 * Fetches the HTML from the reference website (mwncapital.com)
 * and saves it to output/original.html for analysis.
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

const TARGET_URL = 'https://www.mwncapital.com/';
const OUTPUT_DIR = path.join(__dirname, '..', 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'original.html');

async function fetchWebsite() {
  console.log('🔍 Step 1: Fetching reference website...');
  console.log(`   URL: ${TARGET_URL}`);

  try {
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Use curl to fetch the website with browser-like headers
    console.log('   Downloading HTML...');
    const { stdout, stderr } = await execAsync(
      `curl -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${TARGET_URL}"`,
      { maxBuffer: 10 * 1024 * 1024 } // 10MB buffer
    );

    if (stderr && !stderr.includes('Trying') && !stderr.includes('Connected')) {
      console.warn('   ⚠️  Curl warnings:', stderr.substring(0, 200));
    }

    if (!stdout || stdout.length < 100) {
      throw new Error('Received empty or very small response');
    }

    // Check if we got an error page
    if (stdout.includes('Access denied') || stdout.includes('403 Forbidden')) {
      throw new Error('Access denied by server');
    }

    // Save to file
    fs.writeFileSync(OUTPUT_FILE, stdout, 'utf-8');

    const sizeKB = Math.round(stdout.length / 1024);
    console.log(`   ✅ Successfully fetched ${sizeKB}KB of HTML`);
    console.log(`   📄 Saved to: ${OUTPUT_FILE}`);

    // Show first 200 chars as preview
    const preview = stdout.substring(0, 200).replace(/\s+/g, ' ');
    console.log(`   Preview: ${preview}...`);

    return {
      success: true,
      file: OUTPUT_FILE,
      size: stdout.length
    };

  } catch (error) {
    console.error('❌ Error fetching website:', error.message);

    // Try to provide helpful debugging info
    if (error.message.includes('curl')) {
      console.error('   Make sure curl is installed and accessible');
    } else if (error.message.includes('Access denied')) {
      console.error('   The server is blocking automated requests');
      console.error('   This may require using a proxy or different approach');
    }

    throw error;
  }
}

// Main execution
if (require.main === module) {
  fetchWebsite()
    .then(result => {
      console.log('\n✨ Fetch complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Fetch failed:', error.message);
      process.exit(1);
    });
}

module.exports = { fetchWebsite };
