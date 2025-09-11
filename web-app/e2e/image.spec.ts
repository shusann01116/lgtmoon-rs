import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("should add and delete an image", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("link", { name: "LGTMoon-rs" })).toBeVisible();

	// Add a new image
	const input = await page.getByLabel("Image file selector").all();
	expect(input).toHaveLength(2);
	await input[0].setInputFiles(
		path.join(__dirname, "fixtures", "recipena.png"),
	);
	await expect(page.getByRole("article").locator("div").nth(1)).toBeVisible();

	// Delete the image
	await page.getByRole("article").hover();
	const deleteButton = page.getByRole("article").getByRole("button").nth(3);
	await deleteButton.waitFor({ state: "visible" });
	await deleteButton.click();
	await page.getByRole("button", { name: "Delete" }).click();
	await expect(
		page.getByText("画像を追加して LGTMライブラリを作ろう ☺️"),
	).toBeVisible();
});
