const express = require("express");
let router = express.Router();

///model
const { Agency } = require("./models/agency_model");
const { Client } = require("./models/client_model");

router.route("/create_agency_client").post(async (req, res) => {
  try {
    /////if user enter client detail
    if ("ClientId" in req.body) {
      if (await Client.clientExists(req.body.ClientId)) {
        return res.status(400).json({ message: "client already exists" });
      }
      if (!(await Agency.agencyExists(req.body.AgencyId))) {
        return res.status(400).json({ message: "agency doesn't exists" });
      }
      const client = new Client({
        ClientId: req.body.ClientId,
        AgencyId: req.body.AgencyId,
        Name: req.body.Name,
        Email: req.body.Email,
        TotalBill: req.body.TotalBill,
        PhoneNumber: req.body.PhoneNumber,
      });
      await client.save();
      return res.status(201).send("ok");
    }
    //////////if user enter agency detail
    if (await Agency.agencyExists(req.body.AgencyId)) {
      return res.status(400).json({ message: "agency already exists" });
    }

    const agency = new Agency({
      AgencyId: req.body.AgencyId,
      Name: req.body.Name,
      Address1: req.body.Address1,
      Address2: req.body.Address2,
      State: req.body.State,
      City: req.body.City,
      PhoneNumber: req.body.PhoneNumber,
    });
    await agency.save();
    return res.status(201).send("ok");
  } catch (error) {
    res.status(400).json({ message: "error while creating", error: error });
  }
});

router.route("/update_client/:cliendId").patch(async (req, res) => {
  try {
    const ClientId = req.params.cliendId;
    if (!(await Agency.agencyExists(req.body.AgencyId))) {
      return res.status(400).json({ message: "agency doesn't exists" });
    }
    const client = await Client.findOneAndUpdate(
      { ClientId },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!client) return res.status(400).json({ message: "client not found" });
    res.status(200).send("ok");
  } catch (error) {
    res.status(400).json({ message: "Error updating client", error });
  }
});

router.route("/maxbill").get(async (req, res) => {
  try {
    ////find max bill
    const client = await Client.find({})
      .sort([["TotalBill", "desc"]])
      .limit(1);
    ///get agency name
    const agency = await Agency.findOne({ AgencyId: client[0].AgencyId });

    return res.status(200).json({
      AgencyName: agency.Name,
      ClientName: client[0].Name,
      TotalBill: client[0].TotalBill,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "error while getting max bill", error: error });
  }
});
module.exports = router;
