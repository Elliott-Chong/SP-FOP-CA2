const input = require("readline-sync");

const ATTRIBUTES = [
  "Name",
  "Membership Type",
  "Date joined",
  "Date of Birth",
  "Points Earned",
];

// initializing 5 arrays, each corresponding to each member
var member_1 = ["Leonardo", "Gold", "1 Dec 2019", "1 Jan 1980", "1400"];
var member_2 = ["Catherine", "Ruby", "14 Jan 2020", "28 Oct 1985", "250"];
var member_3 = ["Luther", "Gold", "29 Apr 2020", "16 Mar 1992", "3350"];
var member_4 = ["Bruce", "Diamond", "3 Jun 2020", "18 Mar 1994", "40200"];
var member_5 = ["Amy", "Ruby", "5 Jun 2020", "31 May 2000", "500"];

// initializing an array to store all the members
var memberList = [member_1, member_2, member_3, member_4, member_5];

console.log("Welcome to XYZ Membership Loyalty Programme!");
var name = input.question("Please enter your name: ");
//program loop
while (true) {
  console.log();

  console.log(
    `Hi ${name}, please select your choice:\n\t1. Display all members' information\n\t2. Update points earned\n\t3. Statistics\n\t4. Exit`
  );
  var choice = input.question("\t>> ");

  //validate choice
  if (isNaN(choice) || parseInt(choice) < 1 || parseInt(choice) > 4) {
    console.log("Please enter a valid input.");
    continue;
  }
  if (choice.trim() == "4") {
    break;
  }
  if (choice.trim() != "1") {
    console.log("Sorry, work in progress!");
    continue;
  }

  //the choice has to be 1 at this point
  for (var member_index = 0; member_index < memberList.length; member_index++) {
    for (
      var attribute_index = 0;
      attribute_index < ATTRIBUTES.length;
      attribute_index++
    ) {
      console.log(
        `${ATTRIBUTES[attribute_index]}: ${memberList[member_index][attribute_index]}`
      );
    }
  }
}
