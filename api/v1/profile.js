var document = require('./json/document.json')
var company = require('./json/company.json')
var experience = require('./json/experience.json')
var skill = require('./json/skill.json')
module.exports = {
  getDocument: function(req, res, next){
    res.json(document)
  },
  getCompany: function(req, res, next){
    res.json(company)
  },
  getExperience: function(req, res, next){
    res.json(experience)
  },
  getSkill: function(req, res, next){
    res.json(skill)
  }
}