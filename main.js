// Returns a random DNA base
const randomDNABase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)];
}

// Returns a random single strand of DNA containing 15 bases
const mockUpDNAStrand = () => {
  const newStrandArray = [];
  for (let i = 0; i < 15; i++) {
    newStrandArray.push(randomDNABase());
  }
  return newStrandArray;
}

// Creates a virtual P.aequor organism as an object
const pAequorFactory = (num, array) => {
  return {
    specimenNum: num,
    dna: array,
    mutate() {
      let mutation = false;
      let mutatingBase = Math.floor(Math.random() * 15);
      let mutateTo;
      do {
        mutateTo = randomDNABase();
        if (this.dna[mutatingBase] !== mutateTo) {
          this.dna[mutatingBase] = mutateTo;
          mutation = true;
        }
      } while (!mutation);
      return this.dna;
    },
    compareDNA(otherPAequor) {
      let match = 0;
      for (let i = 0; i < otherPAequor.dna.length; i++) {
        if (this.dna[i] === otherPAequor.dna[i]) {
          match++;
        }
      }
      let percentMatch = Math.round((match / otherPAequor.dna.length) * 100);
      return percentMatch;
    },
    willLikelySurvive() {
      let basesCorG = 0;
      for (let base of this.dna) {
        if (base === 'C' || base === 'G') {
          basesCorG++;
        }
      }
      let survival = (basesCorG / this.dna.length);
      return (survival >= 0.6) ? true : false;
    },
    complementStrand() {
      let configComplementFn = (b) => {
        switch (b) {
          case 'A' : return 'T';
          case 'T' : return 'A';
          case 'C' : return 'G';
          case 'G' : return 'C';
        }
      }
      return this.dna.map(configComplementFn);
    }
  };
}

// Creates 30 instances of pAequor that can survive in their natural environment
let instancesOfpAequor = [];
let specimenNumber = 3;
while (instancesOfpAequor.length < 30) {
  let attemptSpecimen = pAequorFactory(specimenNumber, mockUpDNAStrand());
  if (attemptSpecimen.willLikelySurvive()) {
    instancesOfpAequor.push(attemptSpecimen);
  }
  specimenNumber++;
}

// Helper function inverts an object key:value pair for comparison
const invertObjectPair = obj => {
  let inversePair = {};
  for (let key in obj) {
    inversePair[obj[key]] = parseInt(key);
  }
  return inversePair;
}

// Compares percent of DNA matches of all specimens to eachother
let mostRelatedPairs = [];
var highestMatchPercent = 0;
const mostRelatedDNA = specimenGroup => {
  for (let outer = 0; outer < specimenGroup.length; outer++) {
    for (let inner = 0; inner < specimenGroup.length; inner++) {
      if (outer === inner) 
        continue;
      let testMatch = specimenGroup[outer].compareDNA(specimenGroup[inner]);
      if (testMatch === highestMatchPercent) {
        let currentPair = {[specimenGroup[outer].specimenNum]: specimenGroup[inner].specimenNum};
        let duplicate = false;
        for (let pair of mostRelatedPairs) {
          if (Object.keys(pair)[0] === Object.keys(invertObjectPair(currentPair))[0] &&
            Object.values(pair)[0] === Object.values(invertObjectPair(currentPair))[0]) {
              duplicate = true;
          }
        }
        if (!duplicate) mostRelatedPairs.push(currentPair);
      }
      if (testMatch > highestMatchPercent) {
        mostRelatedPairs = [];
        highestMatchPercent = testMatch;
        mostRelatedPairs.push({[specimenGroup[outer].specimenNum]: specimenGroup[inner].specimenNum});
      }
    }
  }
  return mostRelatedPairs;
}

// Prints DNA mutation example
console.log('--------------------------------------------');
let squiggles = pAequorFactory(1, mockUpDNAStrand());
console.log("Squiggles, specimen #" + squiggles.specimenNum + ", original DNA strand: [" + squiggles.dna + "]");
squiggles.mutate();
console.log("Squiggles DNA strand has mutated one DNA base.");
console.log("Squiggles, specimen #" + squiggles.specimenNum + ", mutated DNA strand:  [" + squiggles.dna + "]");
console.log('--------------------------------------------');

// Prints DNA percent match comparison
let louie = pAequorFactory(2, mockUpDNAStrand());
console.log("Louie, specimen #" + louie.specimenNum + ", original DNA strand:     [" + louie.dna + "]");
console.log("When comparing DNA bases between Louie and the mutated-Squiggles:");
console.log(`\tThe percentage of DNA that specimen #${louie.specimenNum} and #${
  squiggles.specimenNum} have in common is ${louie.compareDNA(squiggles)}%.`);
console.log('--------------------------------------------');

// Prints complementary DNA strand
console.log("A complementary DNA strand has 'A's match with 'T's and vice versa and 'C's match with 'G's and vice versa.");
console.log("Louie, specimen #" + louie.specimenNum + ", original DNA strand:      [" + louie.dna + "]");
console.log("Louie, specimen #" + louie.specimenNum + ", complementary DNA strand: [" + louie.complementStrand() + "]");
console.log('--------------------------------------------');

// Prints likelihood of survival
console.log("P.aequor have a likelier chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.");
if (louie.willLikelySurvive()) {
  console.log("Based on that ratio, Louie, specimen #" + louie.specimenNum + ", WILL likely survive.");
}
if (!louie.willLikelySurvive()) {
  console.log("Based on that ratio, Louie, specimen #" + louie.specimenNum + ", will NOT likely survive.");
}
console.log('--------------------------------------------');

// Prints Specimen Numbers of 30 P.aequor to be studied that will likely survive
console.log("We are studying 30 instances of P.aequor that can survive in their natural environment.");
let specimenList = instancesOfpAequor.map(specimen => specimen.specimenNum + " ").join('');
console.log(`Specimen Numbers: ${specimenList}`);
console.log('--------------------------------------------');

// Prints highest percent of DNA matches found in the specimen group
mostRelatedDNA(instancesOfpAequor);
if (mostRelatedPairs.length === 1) {
  console.log("A single specimen pair has the highest percent of DNA matches to eachother:");
}
else {
  console.log(`There are ${mostRelatedPairs.length} specimen pairs that have the highest percent of DNA matches to eachother:`);
}
for (let mostPair of mostRelatedPairs) {
  console.log(`\tSpecimen #${Object.keys(mostPair)[0]} and Specimen #${Object.values(mostPair)[0]} have ${highestMatchPercent}% DNA matching.`);
}
console.log('--------------------------------------------');
