import { expect, test, type Page } from '@playwright/test';

async function enter(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await expect(page.getByText('Hey, Alex', { exact: false })).toBeVisible();
}
async function tab(page: Page, name: string) {
  await page.getByRole('tab', { name, exact: false }).click();
}

test('all main screens, privacy and terms navigate without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await enter(page);
  await tab(page, 'AI Workout');
  await expect(page.getByText('Your exercise lineup')).toBeVisible();
  await tab(page, 'Progress');
  await expect(page.getByText('Your week in motion')).toBeVisible();
  await tab(page, 'Community');
  await expect(page.getByText('Maya Perera')).toBeVisible();
  await tab(page, 'Nutrition');
  await expect(page.getByText('Berry overnight oats')).toBeVisible();
  await tab(page, 'Home');
  await page.getByRole('button', { name: 'Open profile' }).click();
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByRole('switch', { name: 'Notifications preference' }).click();
  await expect(page.getByText('Sample reminders are turned off.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Privacy Policy', exact: true }).click();
  await expect(page.getByText('01 · About this prototype')).toBeVisible();
  await page.getByRole('button', { name: 'Go back' }).click();
  await page.getByRole('button', { name: 'Terms', exact: true }).click();
  await expect(page.getByText('01 · Academic use')).toBeVisible();
  expect(errors).toEqual([]);
});

test('workout controls change the plan and a completed session updates progress', async ({
  page,
}) => {
  await enter(page);
  await tab(page, 'AI Workout');
  await page.getByRole('button', { name: 'Replace Goblet squat', exact: true }).click();
  await expect(page.getByText('Bodyweight squat', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Skip Reverse lunge', exact: true }).click();
  await expect(page.getByText('Reverse lunge', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Shorten workout', exact: true }).click();
  await expect(page.getByText('Duration', { exact: true }).locator('..')).toContainText('16 min');
  await page.getByRole('button', { name: 'Why this workout?', exact: true }).click();
  await expect(page.getByText('not medical advice', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Got it', exact: true }).click();
  await page.getByRole('button', { name: 'Reschedule', exact: false }).click();
  await page.getByRole('button', { name: 'Tomorrow', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Reschedule · Tomorrow' })).toBeVisible();
  await page.getByRole('button', { name: 'Start Workout', exact: true }).click();
  await page.getByRole('button', { name: 'Pause timer', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Resume timer' })).toBeVisible();
  await page.getByRole('button', { name: 'Finish early', exact: true }).click();
  await page.getByRole('button', { name: 'Complete sample workout', exact: true }).click();
  await page.getByRole('button', { name: 'See your progress', exact: true }).click();
  await expect(page.getByText('100%', { exact: true })).toBeVisible();
  await tab(page, 'Home');
  await expect(
    page.getByText('Calories burned', { exact: true }).first().locator('..'),
  ).toContainText('128');
});

test('likes, comments and new posts update the local community feed', async ({ page }) => {
  await enter(page);
  await tab(page, 'Community');
  await page.getByRole('button', { name: 'Like Maya Perera post', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Unlike Maya Perera post', exact: true }),
  ).toContainText('29');
  await page.getByRole('button', { name: 'Comments on Maya Perera post' }).click();
  await page.getByRole('textbox', { name: 'Your comment' }).fill('Great morning motivation!');
  await page.getByRole('button', { name: 'Add comment', exact: true }).click();
  await expect(page.getByText('Great morning motivation!', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.getByRole('button', { name: 'Create Post' }).click();
  await page
    .getByRole('textbox', { name: 'What moved you today?' })
    .fill('Finished my first FitFlow workout!');
  await page.getByRole('button', { name: 'Add to feed' }).click();
  await expect(page.getByRole('textbox', { name: 'What moved you today?' })).toBeHidden();
  await expect(page.getByText('Finished my first FitFlow workout!', { exact: true })).toBeVisible();
});

test('meal and water actions update nutrition totals', async ({ page }) => {
  await enter(page);
  await tab(page, 'Nutrition');
  await page.getByRole('button', { name: 'Add one glass of water' }).click();
  await expect(page.getByText('5 glasses logged')).toBeVisible();
  await page.getByRole('button', { name: 'Add Meal', exact: true }).click();
  await page.getByRole('button', { name: 'Add to Dinner', exact: true }).first().click();
  await expect(page.getByRole('button', { name: 'Close dialog' })).toBeHidden();
  await expect(page.getByText('Salmon & roasted vegetables', { exact: true })).toBeVisible();
  await expect(page.getByText('500 left', { exact: true })).toBeVisible();
});

test('profile edits propagate to Home and Sign Out resets the session', async ({ page }) => {
  await enter(page);
  await page.getByRole('button', { name: 'Open profile' }).click();
  await page.getByRole('button', { name: 'Edit Profile' }).click();
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Sam Lee');
  await page.getByRole('button', { name: 'Save profile' }).click();
  await expect(page.getByText('Sam Lee', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Go back' }).click();
  await expect(page.getByText('Hey, Sam', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Open profile' }).click();
  await page.getByRole('button', { name: 'Sign Out', exact: true }).click();
  await page.getByRole('button', { name: 'Sign Out & reset', exact: true }).click();
  await page.getByRole('button', { name: 'Get Started' }).click();
  await expect(page.getByText('Hey, Alex', { exact: false })).toBeVisible();
});

test('main screens render within small, normal and large phone widths', async ({ page }) => {
  await enter(page);
  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    for (const name of ['Home', 'AI Workout', 'Progress', 'Community', 'Nutrition']) {
      await tab(page, name);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow, `${name} should fit at ${width}px`).toBe(false);
      const tabLabel = page
        .getByRole('tab', { name, exact: false })
        .getByText(name, { exact: true });
      const labelBox = await tabLabel.boundingBox();
      expect(labelBox).not.toBeNull();
      expect(
        labelBox!.y + labelBox!.height,
        `${name} tab label should fit vertically`,
      ).toBeLessThanOrEqual(844);
    }
  }
});

test('capture genuine web previews of the five main screens', async ({ page }) => {
  await enter(page);
  for (const [name, filename] of [
    ['Home', 'home'],
    ['AI Workout', 'ai-workout'],
    ['Progress', 'progress'],
    ['Community', 'community'],
    ['Nutrition', 'nutrition'],
  ]) {
    await tab(page, name);
    await page.screenshot({
      path: `store-assets/screenshots/web/${filename}.png`,
      animations: 'disabled',
    });
  }
});
