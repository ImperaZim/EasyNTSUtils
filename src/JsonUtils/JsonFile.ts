import * as fs from "fs";
import * as path from "path";

/**
 * Interface to define the expected type of data in the JSON file.
 * Replace with a more specific definition as needed.
 */
interface JsonData {
  [key: string]: any; // Adjust this according to the expected JSON structure.
}

/**
 * Class for handling JSON file operations.
 */
export class JsonFile {
  private filePath: string;

  /**
   * Constructor to initialize the JSON file path.
   * @param {string} directory - The directory where the file is located.
   * @param {string} fileName - The name of the JSON file.
   */
  constructor(directory: string, fileName: string) {
    this.filePath = path.join(directory, fileName);
  }

  /**
   * Reads the JSON file content and parses it into a typed object.
   * @returns {JsonData} The parsed content of the JSON file as a typed object.
   * @throws {Error} If an error occurs while reading or parsing the file.
   */
  toParse(): JsonData {
    try {
      const rawData = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(rawData) as JsonData;
    } catch (error) {
      throw new Error(`Error parsing JSON file: ${error}`);
    }
  }

  /**
   * Updates the JSON file content based on a callback function.
   * @param {(data: JsonData) => JsonData} callback - A function that receives the current
   * content of the file and returns the updated content.
   * @throws {Error} If an error occurs while updating the JSON file.
   */
  getUpdater(callback: (data: JsonData) => JsonData): void {
    const data = callback(this.toParse());
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}
