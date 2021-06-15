const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    _id: String,
    tags: [ String ],
    date: Date,
    name: String,
    author: String, 
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() { 
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    // Comparison Operators
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        // .find({ price: { $gte: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })
        .limit(10)
        .sort({ name: 1 }) // 1 indicates ascending order
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

async function getCourses() {
    // Logical Operators
    // or 
    // and

    const courses = await Course
        // .find({ author: 'Mosh', isPublished: true })
        .find()
        .or([ { author: 'Mosh' }, { isPublished: true } ])
        .limit(10)
        .sort({ name: 1 }) // 1 indicates ascending order
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

async function getCourses() {
    const courses = await Course
        // .find({ author: 'Mosh', isPublished: true })
        // Stars with Mosh
        // .find({ author: /^Mosh/ })
        // Ends with Hamedani
        // .find({ author: /Hamedani$/i }) // i = case insensitive
        // Contains Mosh
        .find({ author: /.*Mosh.*/i })
        .limit(10)
        .sort({ name: 1 }) // 1 indicates ascending order
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

// Counting
async function getCourses() {
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .limit(10)
        .sort({ name: 1 }) // 1 indicates ascending order
        .count();
    console.log(courses);
}

// Pagination
async function getCourses() {
    const pageNumber= 2;
    const pageSize = 10
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 }) // 1 indicates ascending order
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = 'Another Author';
    // course.set({
    //     isPublished: true,
    //     author: 'Another author'
    // });
    const result = await course.save();
    console.log('Result ', result);
}

async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate({ _id: id }, {
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, { new: true });
    console.log(course);
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

removeCourse('5a68ff090c553064a218a547');