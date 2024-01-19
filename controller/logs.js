const Log = require("../modals/logs");

const home = async (req, res) => {
  try {
    let { startIndex } = req.params;
    startIndex = parseInt(startIndex, 10) || 0; // Parse the startIndex as an integer, default to 0 if not provided

    const pageSize = 9; // Number of records per page
    const data = await Log.find().skip(startIndex).limit(pageSize);
    const total_count = await Log.countDocuments({});
    res.status(200).json({ message: "Fetched logs", data, total_count });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const filter = async (req, res) => {
  try {
    const { startIndex , params, value } = req.body;
    console.log(req.body)
    const parsedStartIndex = parseInt(startIndex, 10) || 0; 
    const pageSize = 9;
    let messageFilter = {}
    switch(params){
        case 0:
            messageFilter = { level: { $regex: new RegExp(value, "i") } }
            break;     
        case 1:
            messageFilter = { message: { $regex: new RegExp(value, "i") } }
            break;
        case 2:
            messageFilter = { resourceId: { $regex: new RegExp(value, "i") } }
            break;
        case 3:
            messageFilter = { traceId: { $regex: new RegExp(value, "i") } }
            break;
        case 4:
            messageFilter = { spanId: { $regex: new RegExp(value, "i") } }
            break;
        case 5:
            messageFilter = { commit: { $regex: new RegExp(value, "i") } }
            break;
        case 6:
            messageFilter = { parentResourceId: { $regex: new RegExp(value, "i") } }
            break;
    }
    const data = await Log.find(messageFilter)
      .skip(parsedStartIndex)
      .limit(pageSize);
    const total_count = await Log.countDocuments(messageFilter);
    res.status(200).json({ message: "Fetched logs", data, total_count });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home,filter };
