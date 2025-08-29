1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
These are all methods to select HTML elements from the DOM, but they differ in how they select elements and what they return.

getElementById('id'): This is the fastest and most specific method. It selects a single element that has a matching id attribute. Since IDs must be unique in a document, it always returns just one element object or null if no element with that ID is found.

Example: document.getElementById('service-cards') selects the one div with id="service-cards".

getElementsByClassName('class'): This method selects all elements that have the specified class name. It returns an HTMLCollection, which is a live, array-like list of elements. "Live" means if you add or remove elements with that class, the collection updates automatically.

Example: document.getElementsByClassName('card') returns a list of all elements with class="card".

querySelector('selector'): This is a more modern and versatile method. It uses CSS selector syntax to find the first element that matches the specified selector. It can select by ID, class, tag, attribute, or any combination.

Example: document.querySelector('.card .copy-btn') selects the first button with the class copy-btn that is inside an element with the class card.

querySelectorAll('selector'): Similar to querySelector, but it returns all elements that match the CSS selector. It returns a NodeList, which is a static (not live) array-like list.

Example: document.querySelectorAll('.card') returns a list of all elements with class="card".

Method	Selects By	Returns	Live Collection?
getElementById	ID	A single element	N/A
getElementsByClassName	Class Name	HTMLCollection (array-like)	Yes
querySelector	CSS Selector	The first matching element	N/A
querySelectorAll	CSS Selector	NodeList (array-like)	No

Export to Sheets
2. How do you create and insert a new element into the DOM?
Creating and inserting an element is a two-step process:

Create the Element: You first create the element in memory using the document.createElement() method. This doesn't make it appear on the page yet.

JavaScript

const newDiv = document.createElement('div');
Insert the Element: You then need to append this newly created element to an existing element in the DOM. The most common method is appendChild(), which adds the new element as the last child of its parent.

JavaScript

// First, select the parent element where you want to add the new div
const parentContainer = document.getElementById('service-cards');

// Now, append the new div to the parent
parentContainer.appendChild(newDiv);
You can also set properties like innerHTML or className on the new element before you append it, just like you did in your project to create the service cards and history items. Other insertion methods include prepend() (adds to the beginning), insertBefore(), and insertAdjacentElement().

3. What is Event Bubbling and how does it work?
Event bubbling is the process where an event triggered on a nested element "bubbles up" through its ancestors in the DOM tree.

Imagine you have a button inside a div, which is inside the <body>.

HTML

<body>
  <div>
    <button>Click Me!</button>
  </div>
</body>
If you click the button, the click event doesn't just happen on the button. It follows this order:

The event is first captured and handled by the <button> itself.

Then, the event "bubbles up" to its parent, the <div>, which can also handle the click.

Finally, it bubbles up to the <body>, then to <html>, and finally to the document and window.

This allows parent elements to react to events that happen on their children. It's the default behavior for most browser events.

4. What is Event Delegation in JavaScript? Why is it useful?
Event delegation is a technique that takes advantage of event bubbling. Instead of adding an event listener to every single child element, you add just one event listener to their common parent element. This parent listener then waits for an event to bubble up from one of its children and uses the event.target property to figure out which child was actually clicked.

Why is it useful?

Efficiency: It saves memory and improves performance. If you have 100 cards, adding one listener to their parent container is much better than adding 100 separate listeners to each card.

Dynamic Elements: It works automatically for elements added to the page later. If you add a new service card using JavaScript, the parent listener will automatically handle clicks on that new card without needing to attach a new listener to it.

In your project, you added a listener to each card. An alternative using event delegation would be:

JavaScript

// Instead of adding listeners inside the loop...
const cardsContainer = document.getElementById('service-cards');

// Add ONE listener to the parent container
cardsContainer.addEventListener('click', (event) => {
    // Check if the clicked element (or its parent) is a copy button
    if (event.target.closest('.copy-btn')) {
        console.log('A copy button was clicked!');
        // Add copy logic here...
    }
});
5. What is the difference between preventDefault() and stopPropagation() methods?
Both methods are used within event handlers to control the event's behavior, but they do different things.

event.preventDefault(): This method stops the browser's default action for a given event. It doesn't stop the event from bubbling up the DOM tree.

Common Use Case: Preventing a form from submitting when you click a "submit" button, allowing you to validate the inputs with JavaScript first. Or preventing a link (<a> tag) from navigating to a new page when clicked.

Analogy: You tell a delivery driver, "You can go back to the office, but don't drop off the package." The journey continues, but the default task is cancelled.

event.stopPropagation(): This method stops the event from bubbling up to parent elements. The default browser action will still occur unless you also call preventDefault().

Common Use Case: You have a clickable item inside another clickable item. When you click the inner item, you don't want the outer item's click event to fire.

Analogy: You tell the delivery driver, "Drop off the package here, but do not continue your route." The task is completed, but the journey stops immediately.

You can use both together to prevent the default action and stop the event from bubbling further.