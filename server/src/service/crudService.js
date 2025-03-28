const createData = async (data, model, messageSuccess, messageErorr, res) => {
    try {
        const newData = new model(data)
        const saveData = await newData.save()
        res.status(200).json({
            message: messageSuccess,
            data: saveData
        })
    } catch (error) {
        console.log('Error creating data:', error);
        res.status(500).json({ message: messageErorr })
    }
}

const getData = async (keyOfValue, findByValue, model, messageSuccess, messageErorr, res) => {
    if (!keyOfValue || !findByValue || !model) {
        return res.status(400).json({ message: 'Invalid input' })
    }
    const query = { [keyOfValue]: findByValue }
    try {
        const fullData = await model.find(query)
        res.status(200).json({
            message: messageSuccess,
            data: fullData
        })
    } catch (error) {
        console.log('Error getting data:', error);
        res.status(500).json({ message: messageErorr })
    }
}

const getOneDataById = async (model, id, messageSuccess, messageErorr, res) => {
    try {
        if (!id) {
            return res.status(400).json({ message: 'Invalid input' })
        }
        const data = await model.findById(id)
        res.status(200).json({
            message: messageSuccess,
            data: data
        })

    } catch (error) {
        console.log('Error updating data:', error);
        res.status(500).json({ message: messageErorr })
    }
}
const updateDataById = async (id, newData, model, messageSuccess, messageErorr, res) => {
    try {
        if (!id || !newData) {
            return res.status(400).json({ message: 'Invalid input' })
        }

        const dataUpdated = await model.findByIdAndUpdate(id, newData, { new: true })
        res.status(200).json({
            message: messageSuccess,
            data: dataUpdated
        })
    } catch (error) {
        console.log('Error updating data:', error);
        res.status(500).json({ message: messageErorr })
    }
}
module.exports = { createData, getData, getOneDataById, updateDataById }