#!/usr/bin/env node

/**
 * Website Cloner Orchestrator
 *
 * Runs the complete pipeline:
 * 1. Fetch reference website (mwncapital.com)
 * 2. Analyze structure with Claude
 * 3. Generate rebranded version with Middle Coast branding
 */

const { fetchWebsite } = require('./1-fetch');
const { analyzeWebsite } = require('./2-analyze');
const { generateWebsite } = require('./3-generate');

async function run() {
  console.log('🚀 Website Cloner - Complete Pipeline\n');
  console.log('═══════════════════════════════════════════\n');

  const startTime = Date.now();
  let results = {};

  try {
    // Step 1: Fetch
    console.log('STEP 1: FETCH REFERENCE WEBSITE');
    console.log('───────────────────────────────────────────');
    const fetchResult = await fetchWebsite();
    results.fetch = fetchResult;
    console.log('');

    // Step 2: Analyze
    console.log('STEP 2: ANALYZE STRUCTURE');
    console.log('───────────────────────────────────────────');
    const analyzeResult = await analyzeWebsite();
    results.analyze = analyzeResult;
    console.log('');

    // Step 3: Generate
    console.log('STEP 3: GENERATE REBRANDED WEBSITE');
    console.log('───────────────────────────────────────────');
    const generateResult = await generateWebsite();
    results.generate = generateResult;
    console.log('');

    // Summary
    const duration = Math.round((Date.now() - startTime) / 1000);
    console.log('═══════════════════════════════════════════');
    console.log('✨ PIPELINE COMPLETE!\n');
    console.log(`⏱️  Total time: ${duration} seconds\n`);
    console.log('📊 Results:');
    console.log(`   • Original HTML: ${Math.round(results.fetch.size / 1024)}KB`);
    console.log(`   • Structure analysis: ${results.analyze.file}`);
    console.log(`   • Rebranded HTML: ${Math.round(results.generate.size / 1024)}KB`);
    console.log('');
    console.log('🌐 Next Steps:');
    console.log(`   1. Open in browser: file://${results.generate.file}`);
    console.log('   2. Review the rebranded website');
    console.log('   3. Make any adjustments to config/middle-coast-branding.json');
    console.log('   4. Re-run to regenerate: npm run clone');
    console.log('');

    return results;

  } catch (error) {
    console.error('\n═══════════════════════════════════════════');
    console.error('💥 PIPELINE FAILED\n');
    console.error(`Error: ${error.message}\n`);

    if (error.stack) {
      console.error('Stack trace:');
      console.error(error.stack);
    }

    process.exit(1);
  }
}

// Main execution
if (require.main === module) {
  run()
    .then(() => {
      process.exit(0);
    })
    .catch(error => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}

module.exports = { run };
