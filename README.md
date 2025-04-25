____

Bamboo Card QA Automation Assignment

This project is a comprehensive QA automation framework for the Magento demo site, covering critical user journeys like registration, login, wishlist, cart operations, and order placement. It also includes manual test cases, API testing with Postman, and performance testing plans.

____

✅ Tech Stack
	•	Cypress (Test Automation Framework)
	•	Mocha (Default Cypress Test Runner)
	•	Mochawesome (HTML/JSON reporting)
	•	JavaScript (ES6+)
	•	Page Object Model (for scalability and reusability)
	•	dotenv (for secure environment variable management)
	•	Postman (API testing)
	•	JMeter (Performance testing)

____

✅ Setup Instructions

1.	Clone the Repository
git clone https://github.com/Amit-access/bamboo-card-qa-assignment.git
cd bamboo-card-qa-assignment

2.	Install Dependencies
npm install

3.	Create .env File
Create a .env file in the project root with the following keys:
# Login credentials
BAMBOO_USERNAME=your-login-email
BAMBOO_PASSWORD=your-login-password

# API key if applicable (for future usage)
BAMBOO_API_KEY=your-api-key

# Registration test user
NEW_USER_EMAIL=any-user-name
NEW_USER_PASSWORD=any-test-password
Note: This file should not be committed — it’s listed in .gitignore.

📩 A sample .env file with test credentials has been shared via email for review purposes.
Please place it in the project root before running the tests.

___

✅ How to Run Tests

Run All Tests in Headed Mode (Cypress UI):
npx cypress open

Run All Tests in CLI (Headless Mode):
npx cypress run

___

✅ Reporting (Mochawesome)

This framework includes Mochawesome to generate test reports.

After test run:
	•	Reports are stored in:
cypress/reports

To view:

Open the .html file inside the reports directory in your browser.

⸻

✅ Test Cases Covered

(A) User Registration and Login
	•	Register a new user with dynamic email
	•	Validate successful registration
	•	Login using environment credentials

(B) Place Order with Multiple Products
	•	Search and add multiple products to cart
	•	Apply sizes, colors, and quantities
	•	Verify cart total and proceed to checkout

(C) Wishlist Functionality
	•	Add products to wishlist
	•	Move wishlist items to cart
	•	Proceed to checkout from cart

(D) Search Functionality Validation
	•	Validate search results with dynamic queries

⸻

✅ Additional Test Artifacts

📄 Manual Test Cases

Located in the manual-test-cases folder, these documents outline the manual testing scenarios for the application.

🔄 Postman Collection

The postman folder contains a Postman collection for API testing, including endpoints related to user registration, login, and product management.

📈 Performance Testing Plan

The performance-plan folder includes JMeter test plans and documentation for performance testing scenarios.

___

✅ Folder Structure
├── cypress
│   ├── e2e              # Test specs
│   ├── fixtures         # Test data (non-sensitive)
│   ├── pages            # Page Object Models
│   ├── reports          # Mochawesome reports
│   ├── support
│   │   ├── commands.js  # Custom Cypress commands
│   │   └── e2e.js
├── manual-test-cases    # Manual testing documents
├── postman              # Postman collections for API testing
├── performance-plan     # JMeter test plans and performance testing docs
├── cypress.config.js    # Cypress config + dotenv support
├── .env                 # Secure test credentials (not committed)
└── README.md

___

✅ Notes
	•	No sensitive credentials are stored in the project.
	•	All secrets are injected securely via environment variables.
	•	Custom commands (cy.loginWithEnvCredentials) are reused for cleaner test code.

____

✅ Author

Amit
GitHub: Amit-access

____
