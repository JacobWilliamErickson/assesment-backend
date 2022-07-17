const fortunes = ["A beautiful, smart, and loving person will be coming into your life.", "A dubious friend may be an enemy in camouflage.", "A faithful friend is a strong defense.", "A feather in the hand is better than a bird in the air. (2)", "A fresh start will put you on your way.", "A friend asks only for your time not your money.", "A friend is a present you give yourself.", "A gambler not only will lose what he has, but also will lose what he doesn’t have.", "A golden egg of opportunity falls into your lap this month.", "A good friendship is often more important than a passionate romance.", "A good time to finish up old tasks. (2)", "A hunch is creativity trying to tell you something.", "A lifetime friend shall soon be made.", "A lifetime of happiness lies ahead of you.", "A light heart carries you through all the hard times.", "A new perspective will come with the new year. (2)", "A person is never to (sic) old to learn. (2)", "A person of words and not deeds is like a garden full of weeds.", "A pleasant surprise is waiting for you.", "A short pencil is usually better than a long memory any day.", "A small donation is call for. It’s the right thing to do.", "A smile is your personal welcome mat.", "A smooth long journey! Great expectations.", "A soft voice may be awfully persuasive.", "A truly rich life contains love and art in abundance.", "Accept something that you cannot change, and you will feel better.", "Adventure can be real happiness.", "Advice is like kissing. It costs nothing and is a pleasant thing to do. (2)", "Advice, when most needed, is least heeded.", "All the effort you are making will ultimately pay off.", "All the troubles you have will pass away very quickly.", "All will go well with your new project.", "All your hard work will soon pay off.", "Allow compassion to guide your decisions.", "An acquaintance of the past will affect you in the near future.", "An agreeable romance might begin to take on the appearance.", "An important person will offer you support.","An inch of time is an inch of gold.", "Any day above ground is a good day.", "Any decision you have to make tomorrow is a good decision.", "At the touch of love, everyone becomes a poet.", "Be careful or you could fall for some tricks today.", "Beauty in its various forms appeals to you. (2)", "Because you demand more from yourself, others respect you deeply.", "Believe in yourself and others will too.", "Believe it can be done."]
let compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
let requests = require("./db.json");
globalId = 2
module.exports = {
    getRequests: (req, res) => {
        res.status(200).send(requests);
      },
    getCompliment: (req, res) => {
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },createRequest: (req, res) => {
        const { comptext, rank } = req.body;
        let newrequest = {
          id: globalId,
          comptext,
          rank
        };
        requests.push(newrequest);
        res.status(200).send(requests);
        globalId++;
      },deleteRequest: (req, res) => {
        let { id } = req.params;
        let index = requests.findIndex((request) => +request.id === +id);
        if (index === -1) {
          res.status(400).send(`request not found`);
        } else {
          requests.splice(index, 1);
          res.status(200).send(requests);
        }
      },acceptRequest: (req, res) => {
        let {id} = req.params;
        let index = requests.findIndex((request) => +request.id === +id);
        let {comptext}= requests[index]
        console.log(comptext)
        if (index === -1) {
          res.status(400).send(`request not found`);
        } else {
          compliments.push(comptext)
          requests.splice(index, 1);
          res.status(200).send(requests);
        }
      }, getFortunelist:(req,res)=> {
        fortunePretty = ''
        for(i=0;i<fortunes.length;i++){
            fortunePretty += fortunes[i]
            fortunePretty += '\n'
        }
        res.status(200).send(fortunePretty);
      },
      
      getComplimentlist:(req,res)=> {
        complimentsPretty = ''
        for(i=0;i<compliments.length;i++){
            complimentsPretty += compliments[i]
            complimentsPretty += '\n'
        }
        res.status(200).send(complimentsPretty);
      }

}