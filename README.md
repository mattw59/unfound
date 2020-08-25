# README

Unfound is a simplified town building game. It was created for [JS13K](https://js13kgames.com/) in 2020.

I'm using the README to act as a simplified backlog. This allows me to try out some ideas I've been noodling on in my day job, namely that with judicious use of text files and Git, tools such as Jira or even Github's Issues screen can be irrelevant.

In a larger scale codebase, I most likely would document work to be done using other means, such as Gherkin feature files or test code. In this codebase, I'm adding to the Github-flavored Markdown list below as I think of things, and marking them as complete when they are done.

- [ ] Define the allowable tile states in a JSON array
- [ ] Define the game's beginning state in a JSON array, which is copied into local storage on first load
- [ ] Define allowable transitions in a JSON array
- [ ] keep the game state in local storage so we can refresh the game upon logging back in
- [ ] make the viewport in 16 X 9 ratio, around 1000px wide
- [ ] display a stats summary across the top of the screen
- [ ] include a missions list in a left-side menu
- [ ] create a zip for production build
    - [ ] fail if size > 13kb
- [ ] minify or tree-shake with WebPack
- [ ] during a transition, overlay tile with a counting down pie graph
- [ ] add the ability to pan left/right/up/down
- [ ] add the ability to zoom in and out
- [ ] if not zoom a minimap

- [X] initial brainstorming and task outline for development
- [X] add in Webpack to produce a basic development-time artifact
    - [X] single index.html
    - [X] single javascript file
- [X] build one state transition
    - [X] starting state: lightly wooded
    - [X] ending state: cleared
    - [X] time to change states: 60 seconds
    - [X] resources gathered: 3
    - [X] initiate on click
- [X] create a README
