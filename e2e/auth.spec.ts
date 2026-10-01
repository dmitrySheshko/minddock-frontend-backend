import { expect, test, type Page } from '@playwright/test';

const TEST_EMAIL = process.env.E2E_EMAIL || '';
const TEST_PASSWORD = process.env.E2E_PASSWORD || '';

async function openLoginModal(page: Page) {
    await page.goto('/');
    const header = page.getByRole('banner');
    await header
        .getByRole('link', {
            name: 'Sign In',
            exact: true,
        })
        .click();

    await expect(page).toHaveURL('/login');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    return dialog;
}

test.describe('Authentication', () => {
    test('shows authentication actions for guest user', async ({ page }) => {
        await page.goto('/');
        const header = page.getByRole('banner');
        await expect(
            header.getByRole('link', {
                name: 'Sign In',
                exact: true,
            }),
        ).toBeVisible();

        await expect(
            header.getByRole('link', {
                name: 'Get Started',
                exact: true,
            }),
        ).toBeVisible();
    });

    test('opens login modal after clicking Sign In', async ({ page }) => {
        const dialog = await openLoginModal(page);

        await expect(
            dialog.getByRole('heading', {
                name: 'Welcome back',
            }),
        ).toBeVisible();

        await expect(
            dialog.getByLabel('Email'),
        ).toBeVisible();

        await expect(
            dialog.getByLabel('Password'),
        ).toBeVisible();

        await expect(
            dialog.getByRole('button', {
                name: 'Sign in',
                exact: true,
            }),
        ).toBeVisible();

        await expect(
            dialog.getByRole('link', {
                name: 'Create one',
                exact: true,
            }),
        ).toBeVisible();
    });

    test('navigates from login modal to registration modal', async ({ page }) => {
        const dialog = await openLoginModal(page);

        await dialog
            .getByRole('link', {
                name: 'Create one',
                exact: true,
            })
            .click();

        await expect(page).toHaveURL('/registration');

        await expect(page.getByRole('dialog')).toBeVisible();
    });

    test('shows error for incorrect credentials', async ({ page }) => {
        const dialog = await openLoginModal(page);

        await dialog
            .getByLabel('Email')
            .fill('incorrect@example.com');

        await dialog
            .getByLabel('Password')
            .fill('incorrect-password');

        await dialog
            .getByRole('button', {
                name: 'Sign in',
                exact: true,
            })
            .click();

        await expect(
            dialog.getByText('Invalid email or password'),
        ).toBeVisible();

        await expect(page).toHaveURL('/login');
    });

    test('logs in, shows authenticated header and logs out', async ({ page }) => {
        test.skip(
            !TEST_EMAIL || !TEST_PASSWORD,
            'E2E_EMAIL and E2E_PASSWORD are required',
        );

        const header = page.getByRole('banner');
        const dialog = await openLoginModal(page);

        await dialog
            .getByLabel('Email')
            .fill(TEST_EMAIL!);

        await dialog
            .getByLabel('Password')
            .fill(TEST_PASSWORD!);

        await dialog
            .getByRole('button', {
                name: 'Sign in',
                exact: true,
            })
            .click();

        // 4. Successful login redirects to dashboard
        await expect(page).toHaveURL('/dashboard/chat');

        // 5. Return to home page
        await page.goto('/');

        await expect(
            header.getByRole('button', {
                name: 'Sign Out',
                exact: true,
            }),
        ).toBeVisible();

        await expect(
            header.getByRole('link', {
                name: 'Dashboard',
                exact: true,
            }),
        ).toBeVisible();

        await expect(
            header.getByRole('button', {
                name: 'Sign In',
                exact: true,
            }),
        ).not.toBeVisible();

        await expect(
            header.getByRole('button', {
                name: 'Get Started',
                exact: true,
            }),
        ).not.toBeVisible();

        // 6. Logout
        await header
            .getByRole('button', {
                name: 'Sign Out',
                exact: true,
            })
            .click();

        await expect(
            header.getByRole('link', {
                name: 'Sign In',
                exact: true,
            }),
        ).toBeVisible();

        await expect(
            header.getByRole('link', {
                name: 'Get Started',
                exact: true,
            }),
        ).toBeVisible();

        await expect(
            header.getByRole('button', {
                name: 'Sign Out',
                exact: true,
            }),
        ).not.toBeVisible();

        await expect(
            header.getByRole('link', {
                name: 'Dashboard',
                exact: true,
            }),
        ).not.toBeVisible();
    });
});