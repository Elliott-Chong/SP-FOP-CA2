const input = require("readline-sync");

const MAX_OPTION = 12;

const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Sep",
  12: "Dec",
};
var todays_date = new Date();

todays_date = `${todays_date.getDate()} ${
  months[todays_date.getMonth()]
} ${todays_date.getFullYear()}`;

const logWithColor = (string, textRGB, bgRGB, log = true) => {
  var bgColorFormatter;
  if (bgRGB) {
    const [bgr, bgg, bgb] = bgRGB;
    bgColorFormatter = `\x1b[48;2;${bgr};${bgg};${bgb}m`;
  }
  const [r, g, b] = textRGB;
  let textColorFormatter = `\x1b[38;2;${r};${g};${b}m`;
  if (log) {
    console.log(
      `${textColorFormatter}${bgColorFormatter || ""}%s\x1b[0m`,
      string
    );
  } else {
    return `${textColorFormatter}${bgColorFormatter || ""}${string}\x1b[0m`;
  }
};

const errorLog = (string) => {
  logWithColor(string, [255, 0, 0], null);
};

var membership_types = [
  { name: "ruby", required_points: 0 },
  { name: "gold", required_points: 500 },
  { name: "platinum", required_points: 5000 },
  { name: "diamond", required_points: 20000 },
];

// initializing 5 arrays, each corresponding to each member
var member_1 = ["Leonardo", "Gold", "1 Dec 2019", "1 Jan 1980", 1400];
var member_2 = ["Catherine", "Ruby", "14 Jan 2020", "28 Oct 1985", 250];
var member_3 = ["Luther", "Gold", "29 Apr 2020", "16 Mar 1992", 3350];
var member_4 = ["Bruce", "Diamond", "3 Jun 2020", "18 Mar 1994", 40200];
var member_5 = ["Amy", "Gold", "5 Jun 2020", "31 May 2000", 500];

// initializing an array to store all the members
var memberList = [member_1, member_2, member_3, member_4, member_5];

// member class
class Member {
  constructor(name, membership_type, date_joined, birth_date, points) {
    this.name = name;
    this.membership_type = membership_type;
    this.date_joined = date_joined;
    this.birth_date = birth_date;
    this.points = points;
  }

  print() {
    console.log(
      `Name: ${this.name}\nMembership Type: ${this.membership_type}\nDate joined: ${this.date_joined}\nDate of Birth: ${this.birth_date}\nPoints Earned: ${this.points}\n`
    );
  }

  earnPoints(money_spent) {
    var points;

    if (money_spent <= 50) points = 10;
    else if (money_spent <= 100) points = 50;
    else if (money_spent <= 200) points = 100;
    else if (money_spent <= 500) points = 200;
    else if (money_spent <= 1000) points = 500;
    else if (money_spent <= 2500) points = 1000;
    else points = 2000;
    this.points += points;

    this.updateMembershipType();

    // update membership_type if needed
  }

  updateMembershipType() {
    let sorted_membership_types = [...membership_types].sort(
      (a, b) => a.required_points - b.required_points
    );
    for (let membership_type of sorted_membership_types) {
      if (this.points >= membership_type.required_points) {
        this.membership_type = membership_type.name;
      }
    }
  }
}

// membergroup class
class MemberGroup {
  constructor() {
    this.members = [];
    for (let member of memberList) {
      this.members.push(new Member(...member));
    }
  }

  deleteMember(member) {
    // filter the members
    var new_member_list = [];
    for (let other_member of this.members) {
      if (other_member.name.toLowerCase() !== member.name.toLowerCase()) {
        new_member_list.push(other_member);
      }
    }
    this.members = new_member_list;
  }

  findMember(name) {
    // returns the member with the corresponding name, if not return -1
    for (let i = 0; i < this.members.length; i++) {
      if (this.members[i].name.toLowerCase() == name) {
        return this.members[i];
      }
    }
    return -1;
  }

  getMembersOfType(membership) {
    membership = membership.toLowerCase();
    let members = [];
    // get members of a specific membership type
    for (let i = 0; i < this.members.length; i++) {
      if (
        this.members[i].membership_type.toLowerCase() ==
        membership.toLowerCase()
      ) {
        members.push(this.members[i]);
      }
    }
    return members;
  }

  getYoungestMember() {
    let youngest_member = this.members[0];
    for (let i = 0; i < this.members.length; i++) {
      if (
        new Date(this.members[i].birth_date) >
        new Date(youngest_member.birth_date)
      ) {
        youngest_member = this.members[i];
      }
    }
    return youngest_member;
  }
  getOldestMember() {
    let oldest_member = this.members[0];
    for (let i = 0; i < this.members.length; i++) {
      if (
        new Date(this.members[i].birth_date) <
        new Date(oldest_member.birth_date)
      ) {
        oldest_member = this.members[i];
      }
    }
    return oldest_member;
  }

  getHighestMember() {
    let highest_member = this.members[0];
    for (let i = 0; i < this.members.length; i++) {
      if (parseInt(this.members[i].points) > parseInt(highest_member.points)) {
        highest_member = this.members[i];
      }
    }
    return highest_member;
  }

  getLowestMember() {
    let lowest_member = this.members[0];
    for (let i = 0; i < this.members.length; i++) {
      if (parseInt(this.members[i].points) < parseInt(lowest_member.points)) {
        lowest_member = this.members[i];
      }
    }
    return lowest_member;
  }
}

var member_group = new MemberGroup();

logWithColor("Welcome to XYZ Membership Loyalty Programme!", [99, 173, 242]);
var name = input.question(
  logWithColor("Please enter your name: ", [191, 105, 0], null, false)
);
// var name = input.question("Please enter your name: ");
//program loop
while (true) {
  console.log();

  // ask user for choice
  console.log(
    logWithColor(
      `Hi ${name}, please select your choice:\n\t1. Display all members' information\n\t2. Display member information\n\t3. Add new member\n\t4. Update points earned\n\t5. Statistics\n\t6. Exit\n\t--------Advanced Features---------\n\t7. Delete member\n\t8. Add new membership type\n\t9. Display all membership types\n\t10. Delete membership type\n\t11. Modify membership type requirement\n\t12. Add points to member`,
      [99, 173, 242],
      null,
      false
    )
  );
  var choice = input.question("\t>> ");

  //validate choice
  if (
    isNaN(choice) || // check if it's a number
    parseInt(choice) != choice || // check if it's an integer
    parseInt(choice) < 1 ||
    parseInt(choice) > MAX_OPTION
  ) {
    console.log("Please enter a valid input.");
    continue;
  }
  choice = parseInt(choice);
  if (choice == 6) {
    console.log("Thank you & goodbye!");
    break;
  }
  console.log();

  if (choice == 1) {
    // display all members' information
    for (var i = 0; i < member_group.members.length; i++) {
      var member = member_group.members[i];
      member.print();
    }
  } else if (choice == 2) {
    // display a specific member's information
    let query_member = input.question("Please enter member's name: ");
    query_member = query_member.toLowerCase();
    member = member_group.findMember(query_member);
    if (member !== -1) {
      console.log();
      member.print();
    } else {
      console.log("Member does not exist.");
      continue;
    }
  } else if (choice == 3) {
    // add new member
    let new_name = input.question("Please enter member's name: ");
    while (member_group.findMember(new_name) !== -1) {
      console.log();
      console.log(
        "Member's name already exist in the database. Please enter a new name."
      );
      new_name = input.question("Please enter member's name: ");
    }

    let new_birth = input.question("Please enter member's date of birth: ");
    member_group.members.push(
      new Member(new_name, "Ruby", todays_date, new_birth, 0)
    );
  } else if (choice == 4) {
    // update points
    let query_name = input.question("Please enter member's name: ");
    let member = member_group.findMember(query_name);
    if (member == -1) {
      console.log("Member does not exist.");
      continue;
    } else {
      let amount_spent = input.question("Please enter amount spent: ");
      if (isNaN(amount_spent) || !amount_spent) {
        errorLog("Please enter a valid number.");
        continue;
      }
      amount_spent = parseFloat(amount_spent);
      if (amount_spent < 0) {
        errorLog("Please enter a valid number.");
        continue;
      }
      member.earnPoints(amount_spent);
    }
  } else if (choice == 5) {
    // statistics
    while (true) {
      console.log();
      console.log(
        `\t\tPlease enter an option from the sub-menu:\n\t\t1. Display names of (all) a certain type of members only.\n\t\t2. Display the name of the youngest and oldest member in the system.\n\t\t3. Display the name of members with the highest and lowest points earned.\n\t\t4. Display total number of members in each membership type.\n\t\t5. Display the total points in each membership type.\n\t\t6. Return to main menu.`
      );
      let choice = input.question("\t\t>> ");
      //validate submenu choice
      if (
        isNaN(choice) || // check if it's a number
        parseInt(choice) != choice || // check if it's an integer
        parseInt(choice) < 1 ||
        parseInt(choice) > 6
      ) {
        console.log("\t\tPlease enter a valid input.");
        console.log();
        continue;
      }
      choice = parseInt(choice);
      console.log();
      if (choice == 6) {
        break;
      }

      if (choice == 1) {
        // display names of certain type of members
        // var membership_types = ["gold", "ruby", "platinum", "diamond"];
        let membership = input.question("\t\tEnter Membership Type: ");
        membership = membership.toLowerCase();
        while (
          !membership_types.some(
            (mt) => membership.toLowerCase() == mt.name.toLowerCase()
          )
        ) {
          console.log(
            "\t\tPlease enter a valid membership type. " +
              "(" +
              membership_types.map((mt) => mt.name) +
              ")"
          );
          console.log();
          membership = input.question("\t\tEnter Membership Type: ");
        }
        let members = member_group.getMembersOfType(membership);
        console.log(
          `\t\tMember(s) of membership type ${membership}: ${
            members.length == 0
              ? "No one"
              : members.map((member) => member.name).join(", ")
          }`
        );
      } else if (choice == 2) {
        // display youngest and oldest member
        let youngest_member = member_group.getYoungestMember();
        let oldest_member = member_group.getOldestMember();
        console.log("\t\tYoungest member:", youngest_member.name);
        console.log("\t\tOldest member  :", oldest_member.name);
      } else if (choice == 3) {
        // display the members with the highest and lowest points
        let highest_member = member_group.getHighestMember();
        let lowest_member = member_group.getLowestMember();
        console.log("\t\tHighest member:", highest_member.name);
        console.log("\t\tLowest member :", lowest_member.name);
      } else if (choice == 4) {
        // display number of members with each membership type
        // let res = { Ruby: 0, Gold: 0, Platinum: 0, Diamond: 0 };
        let res = new Object();
        for (let membership_type of membership_types) {
          res[membership_type.name] = 0;
        }

        for (let type in res) {
          res[type] = member_group.getMembersOfType(type).length;
        }
        for (let type in res) {
          console.log(`\t\t${type}: ${res[type]}`);
        }
      } else if (choice == 5) {
        // display total number of points for each membership type
        let res = new Object();
        for (let membership_type of membership_types) {
          res[membership_type.name] = 0;
        }
        for (let type in res) {
          let members = member_group.getMembersOfType(type);
          for (let member of members) {
            res[type] += parseInt(member.points);
          }
        }
        for (let type in res) {
          console.log(`\t\t${type}: ${res[type]}`);
        }
      }
    }
  }

  // advanced features
  else if (choice == 7) {
    // delete member
    let query_name = input.question(
      "\tPlease enter the name of the member to be deleted: "
    );
    let member = member_group.findMember(query_name);
    if (member == -1) {
      console.log("Member does not exist.");
      continue;
    } else {
      member_group.deleteMember(member);
      console.log("\tSuccess!");
    }
  } else if (choice == 8) {
    // add new membership type
    let query_type = input.question(
      "\tPlease enter the name of the new membership type: "
    );
    if (!query_type) {
      errorLog("Please enter a valid name.");
      continue;
    }
    // check if the membership type already exist
    for (let i = 0; i < membership_types.length; i++) {
      if (membership_types[i].name == query_type.toLowerCase()) {
        errorLog("\tMembership type already exists.");
        continue;
      }
    }
    let query_points = input.question(
      "\tPlease enter the points required to reach this membership type: "
    );
    if (isNaN(query_points) || !query_points) {
      errorLog("\tPlease enter a valid number");
      continue;
    }
    query_points = parseFloat(query_points);
    if (query_points < 0) {
      errorLog("\tPlease enter a valid amount of points.");
      continue;
    }
    for (let i = 0; i < membership_types.length; i++) {
      if (Math.abs(membership_types[i].required_points - query_points) < 2) {
        errorLog("\tClashing / Duplicate required points.");
        continue;
      }
    }

    membership_types.push({
      name: query_type.toLowerCase(),
      required_points: query_points,
    });
    for (let member of member_group.members) {
      member.updateMembershipType();
    }
  } else if (choice == 9) {
    // display all membership types and their required points
    // sort the membership_types by points ascending
    let sorted_membership_types = [...membership_types].sort(
      (a, b) => a.required_points - b.required_points
    );
    for (let membership_type of sorted_membership_types) {
      console.log(
        `\t${membership_type.name} - required points: ${logWithColor(
          membership_type.required_points,
          [245, 184, 46],
          null,
          false
        )}`
      );
    }
  } else if (choice == 10) {
    // delete membership type
    let query_type = input.question(
      "Please enter the name of the membership type to be deleted: "
    );
    // mt is membership_type
    var exists = false;
    for (let mt of membership_types) {
      // check if the queried type exists in the current membership_types array
      if (mt.name.toLowerCase() == query_type.toLowerCase()) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      errorLog("The membership type does not currently exist!");
      continue;
    }
    // filter out the membership type from the membership_types array
    var new_membership_types = new Array();
    for (let mt of membership_types) {
      if (mt.name.toLowerCase() != query_type.toLowerCase()) {
        new_membership_types.push(mt);
      }
    }
    // update
    membership_types = new_membership_types;
  } else if (choice == 11) {
    // modify the required points for a membership type

    let query_type = input.question(
      "Please enter the name of the membership type to be modified: "
    );
    // mt is membership_type
    var exists = false;
    for (let mt of membership_types) {
      // check if the queried type exists in the current membership_types array
      if (mt.name.toLowerCase() == query_type.toLowerCase()) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      errorLog("The membership type does not currently exist!");
      continue;
    }

    // modify
    let query_points = input.question(
      "Please enter the new amount of required points to reach this membership type: "
    );
    if (isNaN(query_points) || !query_points) {
      errorLog("Please enter a valid number");
      continue;
    }

    if (query_points < 0) {
      errorLog("Please enter a valid amount of points.");
      continue;
    }

    for (let i = 0; i < membership_types.length; i++) {
      if (
        Math.abs(membership_types[i].required_points - query_points) < 2 &&
        membership_types[i].name.toLowerCase() != query_type.toLowerCase()
      ) {
        errorLog("Clashing / Duplicate required points.");
        continue;
      }
    }

    query_points = parseFloat(query_points);
    for (let mt of membership_types) {
      if (mt.name.toLowerCase() == query_type.toLowerCase()) {
        mt.required_points = query_points;
      }
    }
  } else if (choice == 12) {
    // manually add points to a particular person

    let query_member = input.question("Please enter member's name: ");
    query_member = query_member.toLowerCase();
    member = member_group.findMember(query_member);
    if (member == -1) {
      errorLog("Member does not exist.");
      continue;
    }

    let query_points = input.question(
      "Please enter the amount of points that should be added to " +
        query_member +
        ": "
    );
    if (isNaN(query_points) || !query_points) {
      errorLog("Please enter a valid number");
      continue;
    }

    query_points = parseFloat(query_points);

    member.points += query_points;
    member.updateMembershipType();
  }

  console.log();
}
