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

// Creates virtual a P.aequor organism as an object
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
    }
  };
}

// TEST
let squiggles = pAequorFactory(1, mockUpDNAStrand());
console.log("Squiggles, specimen#" + squiggles.specimenNum + ", original DNA strand: [" + squiggles.dna + "]");
squiggles.mutate();
console.log("Squiggles DNA has mutated.");
console.log("Squiggles, specimen#" + squiggles.specimenNum + ", mutated DNA strand:  [" + squiggles.dna + "]");
