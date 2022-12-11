Feature: Add Cake

    As a Manager I should be able to add cake if i provide cake name, description and price
    
    Scenario: As a manager I can add cake
        Given I am on the "cake" page
        And I enter "Vanila" as my "name"
        And I enter "Very Good" as my "description"
        And I enter "2700" as my "price"
        When I click the "add-cake-btn" button
        Then I should be on the "add success" page
