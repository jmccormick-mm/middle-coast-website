import { promises as fs } from "node:fs";
import { join } from "node:path";
import type { GeneratedLayout } from "../agents/layout-generator.js";

/**
 * Writes generated layout files to disk
 * Creates directories if they don't exist and overwrites existing files
 */
export async function writeLayoutFiles(
	files: GeneratedLayout,
	outputDir: string,
): Promise<void> {
	try {
		// Create output directory if it doesn't exist
		await fs.mkdir(outputDir, { recursive: true });
		console.log(`      📁 Created directory: ${outputDir}`);

		// Write each file
		const writePromises = Object.entries(files).map(
			async ([filename, code]) => {
				const filePath = join(outputDir, filename);

				// Validate filename (prevent directory traversal)
				if (filename.includes("..") || filename.includes("/")) {
					throw new Error(`Invalid filename: ${filename}`);
				}

				// Write the file
				await fs.writeFile(filePath, code, "utf8");

				// Get file stats for logging
				const stats = await fs.stat(filePath);
				console.log(`      📄 Wrote ${filename} (${stats.size} bytes)`);

				return filePath;
			},
		);

		// Wait for all files to be written
		const writtenFiles = await Promise.all(writePromises);

		console.log(`      ✅ Successfully wrote ${writtenFiles.length} files`);
	} catch (error) {
		console.error("      ❌ File writing error:", error);
		throw new Error(`Failed to write files: ${error.message}`);
	}
}
