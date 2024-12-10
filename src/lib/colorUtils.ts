import axios from "axios";
import sharp from "sharp";

/**
 * Extracts the two most dominant colors from an image URL.
 *
 * @param imageUrl The URL of the image to process.
 * @returns An array of hex color strings representing the two dominant colors.
 */

export async function getDominantColors(imageUrl: string): Promise<string[]> {
  try {
    // Download the image from the given URL
    const response = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "arraybuffer",
    });

    // Process the image data using sharp
    const { data } = await sharp(response.data)
      .resize(16, 16, { fit: "inside" }) // Resize to 16x16 to reduce processing time
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Calculate the frequency of each color in the pixel data
    const colors: Record<string, number> = {};
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
        .toString(16)
        .padStart(2, "0")}`;
      colors[hex] = (colors[hex] || 0) + 1;
    }

    // Get the top 2 most frequent colors
    return Object.entries(colors)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([color]) => color);
  } catch (error) {
    console.error("Error extracting colors:", error);
    return [];
  }
}

/**
 * Calculate the brightness of a color (from RGB).
 **/

export function determineTextColor(dominantColors: string): string {
  const r = parseInt(dominantColors.slice(1, 3), 16);
  const g = parseInt(dominantColors.slice(3, 5), 16);
  const b = parseInt(dominantColors.slice(5, 7), 16);

  const brightness: number = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return brightness < 128 ? "white" : "black";
}
