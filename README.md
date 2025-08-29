DOM Manipulation in JavaScript

1. Difference Between getElementById, getElementsByClassName, and querySelector/querySelectorAll
These methods select HTML elements from the DOM but differ in selection criteria and return values.

getElementById('id'): Selects a single element with a matching ID. Returns an element object or null if not found. Fastest due to ID uniqueness.
document.getElementById('service-cards')

Selects the div with id="service-cards".

getElementsByClassName('class'): Selects all elements with the specified class. Returns a live HTMLCollection, updating automatically with DOM changes.
document.getElementsByClassName('card')

Returns all elements with class="card".

querySelector('selector'): Uses CSS selector syntax to select the first matching element. Flexible for IDs, classes, tags, or combinations.
document.querySelector('.card .copy-btn')

Selects the first button with class="copy-btn" inside an element with class="card".

querySelectorAll('selector'): Returns a static NodeList of all elements matching the CSS selector.
document.querySelectorAll('.card')

Returns all elements with class="card".





Method
Selects By
Returns
Live Collection?



getElementById
ID
Single element
N/A


getElementsByClassName
Class Name
HTMLCollection
Yes


querySelector
CSS Selector
First matching element
N/A


querySelectorAll
CSS Selector
NodeList
No


2. Creating and Inserting a New Element into the DOM
Creating and inserting an element involves two steps:

Create the Element: Use document.createElement() to create an element in memory.
const newDiv = document.createElement('div');


Insert the Element: Append the element to a parent in the DOM using appendChild().
const parentContainer = document.getElementById('service-cards');
parentContainer.appendChild(newDiv);



Properties like innerHTML or className can be set before appending. Other methods include prepend(), insertBefore(), and insertAdjacentElement().
3. Event Bubbling
Event bubbling is when an event triggered on an element propagates up through its ancestors in the DOM.
Example:
<body>
  <div>
    <button>Click Me!</button>
  </div>
</body>

Clicking the button triggers the click event on:

The <button> (target).
The <div> (parent).
The <body>, <html>, document, and window.

This allows parent elements to handle child events, the default behavior for most browser events.
4. Event Delegation
Event delegation leverages event bubbling by attaching a single event listener to a parent element to handle events from its children, using event.target to identify the source.
Why Useful?

Efficiency: One listener instead of many reduces memory usage.
Dynamic Elements: Automatically handles events for elements added later.

Example:
const cardsContainer = document.getElementById('service-cards');
cardsContainer.addEventListener('click', (event) => {
    if (event.target.closest('.copy-btn')) {
        console.log('A copy button was clicked!');
    }
});

5. Difference Between preventDefault() and stopPropagation()

preventDefault(): Stops the browser's default action for an event (e.g., form submission, link navigation) without stopping bubbling.
stopPropagation(): Prevents the event from bubbling to parent elements, but the default action still occurs.

Examples:

preventDefault(): Stop a form from submitting to validate inputs.
stopPropagation(): Prevent a parent’s click event from firing when clicking a child.

Both can be used together to stop both the default action and bubbling.
