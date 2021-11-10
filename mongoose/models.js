import './init';
import mongoose, { ObjectId } from 'mongoose';

mongoose.model('User', {
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    select: true,
    required: true
  },
  lastOnline: {
    type: Date
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
});

mongoose.model('Program', {
  title: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    required: true
  }
});

mongoose.model('Emotion', {
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  screener: {
    type: String,
    required: false
  },
  subs: {
    type: Array,
    required: false
  },
  emotions: {
    type: Array,
    required: true
  }
});

mongoose.model('Result', {
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  titleId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  emotionId: {
    type: Number,
    required: true
  },
  emotion: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

export const {
  User,
  Program,
  Result,
  Emotion,
} = mongoose.models;

