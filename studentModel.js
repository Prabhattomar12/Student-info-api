import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  class: String,
  subjects: [
    {
      subjectName: String,
    },
  ],
  society: [
    {
      societyName: String,
    },
  ],
  year: String,
});

export default mongoose.model('students', studentSchema);
