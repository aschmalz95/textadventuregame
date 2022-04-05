const textElement = document.querySelector("#text");
const optionsButtonsElement = document.querySelector("#option-buttons");

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(
        (textNode) => textNode.id === textNodeIndex
    );
    textElement.innerText = textNode.text;

    while (optionsButtonsElement.firstChild) {
        optionsButtonsElement.removeChild(optionsButtonsElement.firstChild);
    }

    textNode.options.forEach((option) => {
        if (showOption(option)) {
            const button = document.createElement("button");
            button.innerText = option.text;
            button.classList.add("btn");
            button.addEventListener("click", () => selectOption(option));
            optionsButtonsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1, //DONE
        text: "Do you wish to protect your home from the intruders?",
        options: [
            {
                text: "Yes",
                nextText: 2,
            },
            {
                text: "No",
                nextText: 100,
            },
        ],
    },
    {
        id: 2, //DONE
        text: "The humans are trying to take your home! Who are you?",
        options: [
            {
                text: "Werewolf",
                setState: { physicalCharacter: true },
                nextText: 3,
            },
            {
                text: "Banshee",
                nextText: 3,
                setState: { nonPhysicalCharacter: true },
            },
            {
                text: "Wraith",
                nextText: 3,
                setState: { nonPhysicalCharacter: true },
            },
            {
                text: "Wendigo",
                setState: { physicalCharacter: true },
                nextText: 3,
            },
        ],
    },
    {
        id: 3, //DONE
        text: "Thump... Thump... Thump... You hear a loud knock rapping downstairs on the wooden doors of the large estate you took residence in decades ago. You are all too familiar with this sound. Humans. Outside of your home. Distrubing your peace. What will you do?",
        options: [
            {
                text: "Go downstairs",
                // requiredState: (currentState) => currentState.blueGoo,
                // setState: { blueGoo: false, sword: true },
                nextText: 4,
            },
            {
                text: "Hide",
                //  requiredState: (currentState) => currentState.blueGoo,
                // setState: { blueGoo: false, shield: true },
                nextText: 8,
            },
            {
                text: "Ignore the sound",
                nextText: 5,
            },
        ],
    },
    {
        id: 4, //DONE
        text: "You go downstairs and notice the door beginning to cave in, you quickly notice a large wardrobe to your left. Would you like to barricade the door?",
        options: [
            {
                text: "Yes",
                requiredState: (currentState) => currentState.physicalCharacter,
                nextText: 7,
            },
            {
                text: "No",
                requiredState: (currentState) => currentState.physicalCharacter,
                nextText: 6,
            },
            {
                text: "No",
                requiredState: (currentState) => currentState.nonPhysicalCharacter,
                nextText: 13,
            },
        ],
    },
    {
        id: 5, //DONE
        text: "You ignore the humans, they eventually stormed in with you totally unprepared, resulting in you losing your manor and perish.",
        options: [
            {
                text: "Game Over, Try Again",
                nextText: -1,
            },
        ],
    },
    {
        id: 6, //DONE
        text: "You decide against using the wardrobe, as time feels like it's slipping away. Instead, you rush outside the room to grab supplies for the oncoming intruders.",
        options: [
            {
                text: "Check the Master Bedroom",
                setState: { defend: true },
                nextText: 15,
            },
            {
                text: "Check the Dining Hall",
                nextText: 10,
            },
        ],
    },
    {
        id: 7, //DONE
        text: "You rush over to the wardobe and position it snug in front of the door. You have bought some extra time, but you know the humans barging in is inevitable. What will you do next?",
        options: [
            {
                text: "Hide",
                nextText: 8,
            },

            {
                text: "Go Look for Supplies",
                nextText: 9,
            },
        ],
    },
    {
        id: 8,
        text: "Where will you hide?",
        options: [
            {
                text: "Bathroom",
                nextText: 10,
            },
            {
                text: "Master Bedroom",
                setState: { hide: true },
                nextText: 15,
            },
            {
                text: "The Cellar",
                nextText: 11,
            },
        ],
    },
    {
        id: 9,
        text: "If you are to stand a chance against the intruders, you need to protect yourself. Where will you check for supplies?",
        options: [
            {
                text: "Check the Master Bedroom",
                setState: { defend: true },
                nextText: 15,
            },
            {
                text: "Check the Dining Hall",
                nextText: 10,
            },
            {
                text: "Check the Cellar",
                nextText: 19,
            },
        ],
    },
    {
        id: 10, //DONE
        text: "...bam... BAM!! As you are headed towards the location, the wooden doors split, a horde of humans pool into your manor. You were quickly overwhelmed.",
        options: [
            {
                text: "Game Over, Try Again",
                nextText: -1,
            },
        ],
    },
    {
        id: 11, //DONE
        text: "...bam... BAM!! As you reach the cellar, above, you hear the door crash open and footsteps pounding on the upper floor. The humans have breached the manor! What's your next step?",
        options: [
            {
                text: "Hide under the staircase",
                nextText: 12,
            },
            {
                text: "Head towards the backwall",
                nextText: 13,
            },
            {
                text: "Hide between two wine barrels",
                requiredState: (currentState) => currentState.physicalCharacter,
                nextText: 14,
            },
        ],
    },
    {
        id: 12, //DONE
        text: "You foolishly thought the staircase was a safe bet, however, within a short matter of time the humans storm the cellar and track your location down. You are quickly outnumbered and perish.",
        options: [
            {
                text: "Game Over, Try Again",
                nextText: -1,
            },
        ],
    },

    {
        id: 13, //DONE
        text: "You swiftly, head towards the back wall, careful not to make a sound. Aha! A secret passage. You knew this would come in handy. You safely make your way out of the manor. Now to find a new home. Congratulations, you survived!",
        options: [
            {
                text: "Play Again",
                nextText: -1,
            },
            {
                text: "Farewell",
                nextText: 100,
            },
        ],
    },
    {
        id: 14, //DONE
        text: "You manage to squeeze your vessel in the space, it's a snug fit. But it will have to do. After what feels like hours, the humans have raided your home. However, miraculously, did not discover your hiding spot. Congratulations, you survived!",
        options: [
            {
                text: "Play Again",
                nextText: -1,
            },
            {
                text: "Farewell",
                nextText: 100,
            },
        ],
    },
    {
        id: 15, //DONE
        text: "You swiftly make your way up to the Master Bedroom. ...bam...bam...BAM! Upon entering, you hear an uproar downstairs in the foyer as the humans rush into your manor. What next?",
        options: [
            {
                text: "Grab nearby dagger on the beside table",
                requiredState: (currentState) => currentState.defend,
                nextText: 17,
            },
            {
                text: "You don't need any weapons! You're a monster for crying out loud. Let's ambush the humans one-by-one.",
                requiredState: (currentState) => currentState.defend,
                nextText: 18,
            },
            {
                text: "Hide in a nearby wardrobe",
                requiredState: (currentState) => currentState.hide,
                nextText: 14,
            },
            {
                text: "Hide under the bed",
                requiredState: (currentState) => currentState.hide,
                nextText: -1,
            },
        ],
    },
    {
        id: 16, //DONE
        text: "The humans rush to your location, if you had a heart--it would be pounding loudly in your ears. Unfortunately, it doesn't take long for your location to be revealed. You are promptly exorcised by the team of humans.",
        options: [
            {
                text: "Game Over, Try Again",
                nextText: -1,
            },
            {
                text: "Farewell",
                nextText: 100,
            },
        ],
    },
    {
        id: 16, //DONE
        text: "The humans rush to your location, if you had a heart--it would be pounding loudly in your ears. They quickly surround you, however, amidst the fight, the dagger in your hand is quickly smacked to the siide--leaving you vulnerable. With no time to think, the humans overwhelm you. You perish.",
        options: [
            {
                text: "Game Over, Try Again",
                nextText: -1,
            },
            {
                text: "Farewell",
                nextText: 100,
            },
        ],
    },
    {
        id: 18, //WINNER
        text: "You've spent nearly a millenia defending yourself--you don't need any assistance from man-made tools. The humans eventually swarm to your location. However, they are greatly unmatched to your brute strength. You defeat the humans. Congratulations!",
        options: [
            {
                text: "Play Again",
                nextText: -1,
            },
            {
                text: "Farewell",
                nextText: 100,
            },
        ],
    },
    {
        id: 19, //DONE
        text: "You stealthily make your way down into the cellar, without being caught. Once you arrive it becomes abundantly clear that there is nothing here to defend yourself with. Just a bunch of barrels. What will you do?",
        options: [
            {
                text: "Hide",
                nextText: 11,
            },

        ],
    },
    {
        id: 13, //DONE
        text: "Because you do not have a physical form, you are unable to manipulate large objects around you. What will you do?",
        options: [
            {
                text: "Hide",
                nextText: 8,
            },
        ]

    },
    {
        id: 100, //DONE
        text: "Farewell.",
        options: []

    },
];

startGame();