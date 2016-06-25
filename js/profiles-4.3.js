/*! MetLife Careers Module 4.3 - Profile Script */
/*! Developer: Michael "Spell" Spellacy, Developer: Michael "Spell" Spellacy. Twitter: @spellacy, GitHub: michaelspellacy */

profileNavigation = function() {

    if (!document.getElementById("profile-container")) return false; // Exit if profile-container does not exist

    // Polyfill for IE < 9 indexOf

    if (!Array.prototype.indexOf) {

      Array.prototype.indexOf = function(elt /*, from*/) {

        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;

        from = (from < 0) ? Math.ceil(from) : Math.floor(from);

        if (from < 0)

          from += len;

          for (; from < len; from++) {

            if (from in this &&

              this[from] === elt)
              return from;

          }

        return -1;

      };

    }

    // Get Section Element

    var sections = document.getElementById("profiles").getElementsByTagName("section");

    // Get Navigation Element

    var navLinks = document.getElementById("profile-navigation").getElementsByTagName("li");

    // Create new array to populate section.id values with, we'll need this shortly

    var profileArray = new Array;

    // Loop through each section

    for (var n=0; n < sections.length; n++) {

      // Set default for each section: aria-hidden: true and hidden: true

      sections[n].setAttribute("hidden", "true");
      sections[n].setAttribute("aria-hidden", "true");

      // Grab each section id value

      var sectionNames = sections[n].id;

      // Populate new array with section id values

      profileArray.push(sectionNames);

      // Now, create three elements we can use as a hook for "shockwaves" (prefer not to add extraneous markup if we don't have to) 

      var count;

      for (count=0; count < 3; count++) {

        var pulse = document.createElement("div");

        var span = document.createElement("span");

        pulse.className += "pulse pulse-" + (count + 1);

        sections[n].appendChild(pulse);

        pulse.appendChild(span);

      }

    }

    // console.log("We have the following values in our array: " + profileArray);    

    // Set default profile

    var defaultProfile = sections[0].id; // Always first section unless specified otherwise (e.g., sections[0].id or just "shelly")

    // Grab hash from URL

    var url = window.location.hash;

    // Remove the hash

    var hash = url.replace(/^#/, "");

    // If hash exists and hash matches value in our array, then

    if(window.location.hash && profileArray.indexOf(hash) > -1) { 

      // Add class name to selected section from hash 

      var selectedSection = document.getElementById(hash);

      selectedSection.removeAttribute("hidden");
      selectedSection.setAttribute("aria-hidden", "false");
      selectedSection.setAttribute("tabindex", "-1");
      selectedSection.focus();

      // Add class name to selected nav item from hash

      document.getElementById("nav-" + hash).className += "active";

    } else {

      // Activate default profile

      document.getElementById(defaultProfile).removeAttribute("hidden");
      document.getElementById(defaultProfile).setAttribute("aria-hidden", "false");

      // Activate default navigation

      document.getElementById("nav-" + defaultProfile).className += "active";

    }

    // Navigation

    for (var i=0; i < navLinks.length; i++) {

       navLinks[i].children[0].children[0].onclick = function() {

        // Remove/Add className from profile navigation links

        for (var x=0; x < navLinks.length; x++) {

            navLinks[x].className = "";

        }

        this.parentNode.parentNode.className += "active";

        // Remove/Add className from sections

        for (var n=0; n < sections.length; n++) {

          sections[n].setAttribute("hidden", "true");
          sections[n].setAttribute("aria-hidden", "true");
          sections[n].removeAttribute("tabindex");
          sections[n].blur();

        }

        var targetID = this.getAttribute("href").replace(/^#/, "");

        var targetElement = document.getElementById(targetID);

        // Okay, To restart animation on navigation toggle, we need to clone, remove and reinsert...
        // CSS animation won't restart in some browsers
        // http://css-tricks.com/restart-css-animation/

        var currentElement = targetElement;

        var newElement = targetElement.cloneNode(true);

        currentElement.parentNode.replaceChild(newElement, currentElement);

        // Add class to new element

        newElement.removeAttribute("hidden");
        newElement.setAttribute("aria-hidden", "false");
        newElement.setAttribute("tabindex", "-1");
        newElement.focus();

        // For those browsers that support history.pushState, let's change the hash dynamically

        if(history.pushState) {

          history.pushState(null, null, "#" + targetID);

        } 

        return false;

    }

  }

}

profileNavigation();
