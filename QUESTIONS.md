> It has a login form for signing in with a valid email and a password.

A form with a pre-filled valid email and password values?
Or, a form with a valid email and password fields?
Or a form, which checks, if email and password entered look like email and password?


> the POST request for this form will fail

Which form? Login form?
Or a recipe list with all the recipes from recipes.json?
Or is it a single combined form?


> Each recipe can be marked as favorite/unfavorite
> Each recipe can be rated/unrated

Looks like a reverse engineering of the JSON file is expect here to guess what recipes we are talking about :)

Are this things (favorite/unfavorite and rated/unrated) stateful on page so the user can change the state?


> You MUST implement a responsive design

A responsive design for a list of recipes with two checkboxes?
Sounds like the readme talks about a more complicated interface, which leads us to the next question.


> The main content is loaded dynamically from the JSON file attached.

Is there any documentation for the data inside? A link to a working example? PSD/PNG file with a brief mockup of an interface expected. A user scenario for this html page should really help to answer most of these question.

Examples would be:
1. The page is a shopping cart page where a user confirms an order.
2. The page is a popup where user should quickly toggle the sate of their favorites.
3. The page is a search result where user reads a short overview and marks and rates recipes.
4. The page is a single recipe page (!) where user reads through all the recipe and description.
5. The page could be a step in a guide helping to plan a party with recipe suggestions.


> You MUST use HTML5, CSS3 and Vanilla (plain) JavaScript or AngularJS (preferred)

And the most essential question: which browser support does this code challenge target?
