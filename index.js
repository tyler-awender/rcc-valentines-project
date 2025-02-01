(function() {
    const URL = "http://localhost:8080"; // Why??????????
    var doConfetti = false; // If true do x, if false, do why 
    var timer = null; // Think of a clock without gears and everything in the clock - null
    var interval = 2000; // Self explanatory
  
    var audio = new Audio("resources/sounds/disco-groove-122074.mp3") 
    // Defining resource
    // Storing object in value - audio is now essentially a tutorial book with a bunch of functions 
  
    window.addEventListener("load", init); 
    // Object to interact with Browser Window
    // EventListener does what is says it checks (listens) for an event 
    // Load is the type of action
    // init is the action performed
    // RTFM
  
    /**
     * Adds event listeners to each button
     */
    function init() { // Talk about what functions are
      audio.volume = 0.25; //Function from the audio object
      id("yes-btn").addEventListener("click", weParty);
      id("no-btn").addEventListener("mouseover", moveButton);
      id("no-btn").addEventListener("click", moveButton);
      id("reset-btn").addEventListener("click", resetPage);
      // briefly go over helper functions
      // Defines actions for each button
    }
  
    // Gloss over the animations - high concept
    // ---------------------------------------------------------------------------------------
    /**
     * Move the button
     */
    function moveButton() {
      const top = getRandomNumber(window.innerHeight - this.offsetHeight);
      const left = getRandomNumber(window.innerWidth - this.offsetWidth);
  
      animateMove(id("no-button"), "left", left).play();
      animateMove(id("no-button"), "top", top).play();
    }

    /**
     * Animate the move
     */
    const animateMove = (element, prop, pixels) =>
    anime({
      targets: element,
      [prop]: `${pixels}px`,
      easing: "easeOutCirc"
    });


    // -------------------------------------------------------------------------------

    /**
     * Throws a party
     */
    function weParty() {
      doConfetti = true; // Make variable true, its party time
      const jsConfetti = new JSConfetti(); // Imported from html
      id("reset-container").classList.remove("hidden"); //classList.remove() allows to remove a class element from html
      id("celebration").classList.remove("hidden");
      id("question").classList.add("hidden"); // this adds a class element
      id("answers").classList.add("hidden");

      audio.play(); // function of audio to play

      if (timer !== null) return; // If timer is not null, something went wrong, so stop here - return ends the current function

      jsConfetti.addConfetti({
        emojis: ['❤️', '✨'],
      }).then(() => jsConfetti.addConfetti()) // Fairly complex for beginners, most reference docs will have code you can copy for now

      // Set interval for confetti
      timer = setInterval(function() {
        jsConfetti.addConfetti({
          emojis: ['❤️', '✨'],
        }).then(() => jsConfetti.addConfetti())
      }, interval);

    }

    function resetPage() { //clear everything to default
      doConfetti = false;
      clearInterval(timer);
      timer = null;
  
      audio.pause();

      // Remove all confetti
      var confettiElements = document.getElementsByTagName("canvas"); // Stores a list of elements (confetti) with the canvas tag
      for (const c of confettiElements) { // Loop throug the list and remove
          c.remove();
      }
  
      //redefine styles
      id("no-button").style.left = '';
      id("no-button").style.top = '';
      id("reset-container").classList.add("hidden");
      id("celebration").classList.add("hidden");
      id("question").classList.remove("hidden");
      id("answers").classList.remove("hidden");
    }

    /* --- Helper Functions --- */
  
    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} idName - element ID
     * @returns {object} DOM object associated with id.
     */
    function id(idName) { 
      return document.getElementById(idName);
    }

    function getRandomNumber(num) {
      return Math.floor(Math.random() * (num + 1));
    }
  })();