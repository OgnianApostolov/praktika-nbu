const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0-owqei.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});