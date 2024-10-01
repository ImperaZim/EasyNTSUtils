import * as fs from "fs";
import * as path from "path";

/**
 * Class for handling JSON file operations.
 */
export class JsonFile {
  private filePath: string;

  constructor(directory: string, fileName: string) {
    this.filePath = path.join(directory, fileName);
  }

  toParse() {
    try {
      const rawData = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(rawData);
    } catch (error) {
      throw new Error(`Error parsing JSON file: ${error}`);
    }
  }

  getUpdater(callback: (data: any) => any) {
    const data = callback(this.toParse());
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}
