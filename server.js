// variables and constants
const { writeFileSync, readFileSync } = require('fs');
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();

// middleware
const PORT = process.env.PORT || 3001;