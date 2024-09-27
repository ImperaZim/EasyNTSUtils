// Define the class with a static property for saving data
export class BuilderRegistry {
  // Static property to hold the builders (this replaces client.builders)
  static builders: Record<string, any> = {};
}

// Function to register data into the static `builders` property
export function __registry(data: any) {
  if (data && typeof data === "object") {
    for (const key in data) {
      const value = data[key];
      BuilderRegistry.builders[key] = value; // Use the static property of the class
    }
  }
}

// Function to retrieve data from the static `builders` property
export function get(key: string, over: boolean = false): any {
  if (over) {
    return BuilderRegistry.builders; // Return the entire static `builders`
  }
  return BuilderRegistry.builders[key] || []; // Return the specific entry
}
