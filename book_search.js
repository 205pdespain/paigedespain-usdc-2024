/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {

    var results = [];

    var searchTermRegex = `(^| )${searchTerm}( |$|!|\\.|\\?)`;

    var numBooks = scannedTextObj.length;

    for (let bookIndex = 0; bookIndex < numBooks; bookIndex++){

        var numContent = scannedTextObj[bookIndex].Content.length;

        for (let contentIndex = 0; contentIndex < numContent; contentIndex++){

            let textStr = scannedTextObj[bookIndex].Content[contentIndex].Text;

            if (textStr.search(searchTermRegex) != -1) {
                results.push({
                    "ISBN": scannedTextObj[bookIndex].ISBN,
                    "Page": scannedTextObj[bookIndex].Content[contentIndex].Page,
                    "Line": scannedTextObj[bookIndex].Content[contentIndex].Line
                });
            }

        }

    }


    var result = {
        "SearchTerm": searchTerm,
        "Results": results
    };
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}




/** MY UNIT TESTS **/

// Helper function to reduce code complexity
function test(testName, expected, actual){
    if (JSON.stringify(expected) === JSON.stringify(actual)) {
        console.log("PASS: " + testName);
    } else {
        console.log("FAIL: " + testName);
        console.log("Expected:", expected);
        console.log("Received:", actual);
    }
}

// SECTION: Zero Entries
var input =[];
var searchTerm = "the";

// ZeroEntries
var expected = {
    "SearchTerm": searchTerm,
    "Results": []
}
var result = findSearchTermInBooks(searchTerm, input);
test("ZeroEntries", expected, result);


// SECTION: One Entry, One Content
input = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            }
        ] 
    }
]

// OneEntryOneContentPositiveTest
searchTerm = "now";
expected = {
    "SearchTerm": searchTerm,
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}
result = findSearchTermInBooks(searchTerm, input);
test("OneEntryOneContentPositiveTest", expected, result);

// OneEntryOneContentNegativeTest
searchTerm = "the";
expected = {
    "SearchTerm": searchTerm,
    "Results": []
}
result = findSearchTermInBooks(searchTerm, input);
test("OneEntryOneContentNegativeTest", expected, result);

// SECTION: Matching Sensitivity
input = [
    {
        "Title": "Confusing Book",
        "ISBN": "9876543210987",
        "Content": [
            {
                "Page": 1,
                "Line": 2,
                "Text": "the developer" // beginning and end of str check
            },
            {
                "Page": 3,
                "Line": 4,
                "Text": "it was THE dEvElOpEr-" // case sensitivity and bad punctuation
            },
            {
                "Page": 5,
                "Line": 6,
                "Text": "yeah the2 developers" // not just substrings
            },
            {
                "Page": 7,
                "Line": 8,
                "Text": "i am developer!" // punctuation okay
            }
        ] 
    }
]

searchTerm = "the";
expected = {
    "SearchTerm": searchTerm,
    "Results": [
        {
            "ISBN": "9876543210987",
            "Page": 1,
            "Line": 2
        }
    ]
}
var expectedResultSize = 1;
result = findSearchTermInBooks(searchTerm, input);
var resultSize = result.Results.length;

// MatchingSensitivityCasingAndSubstring
test("MatchingSensitivityCasingAndSubstring", expectedResultSize, resultSize);

// MatchingSensitivityBeginningOfString
test("MatchingSensitivityBeginningOfString", expected, result);

// MatchingSensitivityMiddleOfString
searchTerm = "am";
expected = {
    "SearchTerm": searchTerm,
    "Results": [
        {
            "ISBN": "9876543210987",
            "Page": 7,
            "Line": 8
        }
    ]
}
result = findSearchTermInBooks(searchTerm, input);
test("MatchingSensitivityMiddleOfString", expected, result);

// MatchingSensitivityEndOfString
searchTerm = "developers";
expected = {
    "SearchTerm": searchTerm,
    "Results": [
        {
            "ISBN": "9876543210987",
            "Page": 5,
            "Line": 6
        }
    ]
}
result = findSearchTermInBooks(searchTerm, input);
test("MatchingSensitivityEndOfString", expected, result);


// MatchingSensitivityPunctuationPositive
searchTerm = "developer";
expected = {
    "SearchTerm": searchTerm,
    "Results": [
        {
            "ISBN": "9876543210987",
            "Page": 1,
            "Line": 2
        },
        {
            "ISBN": "9876543210987",
            "Page": 7,
            "Line": 8
        }
    ]
}
result = findSearchTermInBooks(searchTerm, input);
test("MatchingSensitivityPunctuationPositive", expected, result);

// MatchingSensitivityPunctuationNegative
searchTerm = "dEvElOpEr";
expected = {
    "SearchTerm": searchTerm,
    "Results": []
}
result = findSearchTermInBooks(searchTerm, input);
test("MatchingSensitivityPunctuationNegative", expected, result);



// SECTION: One Entry, Multiple Content
input = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ] 
    }
]

// OneEntryMultipleContentMultipleResults
searchTerm = "and";
expected = {
    "SearchTerm": searchTerm,
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}
result = findSearchTermInBooks(searchTerm, input);
test("OneEntryMultipleContentMultipleResults", expected, result);

// OneEntryMultipleContentNoResults
searchTerm = "testing";
expected = {
    "SearchTerm": searchTerm,
    "Results": []
}
result = findSearchTermInBooks(searchTerm, input);
test("OneEntryMultipleContentNoResults", expected, result);


// SECTION: Multiple Entries, Multiple Content
input = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ] 
    },
    {
        "Title": "Please Hire me",
        "ISBN": "0123455567890",
        "Content": [
            {
                "Page": 1,
                "Line": 2,
                "Text": "I\'m a great candidate because"
            },
            {
                "Page": 3,
                "Line": 4,
                "Text": "I\'m not afraid to roll up my sleeves and contribute in any way, technical or otherwise,"
            },
            {
                "Page": 5,
                "Line": 6,
                "Text": "to create a government that better serves all Americans."
            },
            {
                "Page": 7,
                "Line": 8,
                "Text": "That was from your website, but I promise, I\'m the person you want if you think this is a fun Easter egg :)"
            }
        ] 
    }
]

// MultipleEntriesMultipleContentNoResults
searchTerm = "offer";
expected = {
    "SearchTerm": searchTerm,
    "Results": []
}
result = findSearchTermInBooks(searchTerm, input);
test("MultipleEntriesMultipleContentNoResults", expected, result);

// MultipleEntriesMultipleContentMultipleResults
searchTerm = "the";
expected = {
    "SearchTerm": searchTerm,
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "0123455567890",
            "Page": 7,
            "Line": 8
        }
    ]
}
result = findSearchTermInBooks(searchTerm, input);
test("MultipleEntriesMultipleContentMultipleResults", expected, result);

