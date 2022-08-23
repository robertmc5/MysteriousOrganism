// Returns a random DNA base
const randomDNABase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)];
}

// Returns a random single stand of DNA containing 15 bases
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
      console.log(`\tThe percentage of DNA that specimen #${this.specimenNum} and #${
        otherPAequor.specimenNum} have in common is ${percentMatch}%.`);
    },
    willLikelySurvive() {
      let basesCorG = 0;
      for (let base of this.dna) {
        if (base === 'C' || base === 'G') {
          basesCorG++;
        }
      }
      let survival = (basesCorG / this.dna.length);
      if (survival >= 0.6) {
        return true;
      }
      else {
        return false;
      }
    }
  };
}

// Creates 30 instances of pAequor that can survive in their natural environment
let instancesOfpAequor = [];
let specimenNumber = 1;
while (instancesOfpAequor.length < 30) {
  let attemptSpecimen = pAequorFactory(specimenNumber, mockUpDNAStrand());
  if (attemptSpecimen.willLikelySurvive()) {
    instancesOfpAequor.push(attemptSpecimen);
  }
  specimenNumber++;
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
louie.compareDNA(squiggles);
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
