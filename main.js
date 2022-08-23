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
    }
  };
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
