from playwright.sync_api import sync_playwright

def verify_calendar():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to the app
        print("Navigating to http://localhost:3000")
        page.goto("http://localhost:3000")

        # Wait for the main title
        page.wait_for_selector("text=React Boxed Calendar")
        print("Title found")

        # Verify default calendar is present
        page.wait_for_selector("text=Single Date Selection")
        print("Single Date Selection found")

        # Find a date in the current month (e.g., 15) and click it
        # We need to make sure we click on a button that is not disabled
        # The calendar renders buttons with date numbers.
        # Let's try to click on the 15th of the current month.
        # Since it's dynamic, let's just find a button with text "15" inside the first calendar.

        # First calendar container
        first_calendar = page.locator(".bg-white").first

        # Find button with text "15" inside it
        day_15 = first_calendar.get_by_role("button", name="15").first
        if day_15.is_visible():
            day_15.click()
            print("Clicked on day 15")

            # Verify selection text updates
            # The text below says "Selected: ..."
            # We expect it to show the date.
            page.wait_for_timeout(500) # Wait for state update
            selected_text = page.locator("text=Selected:").first.text_content()
            print(f"Selection text: {selected_text}")
        else:
            print("Day 15 not visible (maybe end of month?)")

        # Take screenshot
        screenshot_path = "verification/calendar_verification.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_calendar()
