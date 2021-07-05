// const FormData = require("form-data");
const fs = require("fs");
const { FilesHelper } = require("../utils/FilesHelper");

const fields = ["imageFiles", "audioFiles"];
const form = new FormData();
// const imageFile = fs.readFileSync(__dirname + "test-files/airport.jpg");
// const audioFile = fs.readFileSync(__dirname + "test-files/airport.m4a");

const testObject = {
	imageFiles: [
		{
			fieldname: "imageFiles",
			originalname: "airport.jpg",
			mimetype: "image/jpeg",
			buffer: undefined,
		},
		{
			fieldname: "imageFiles",
			originalname: "fig.jpg",
			mimetype: "image/jpeg",
			buffer: undefined,
		},
		{
			fieldname: "imageFiles",
			originalname: "flower.jpg",
			mimetype: "image/jpeg",
			buffer: undefined,
		},
		{
			fieldname: "imageFiles",
			originalname: "fungus.jpg",
			mimetype: "image/jpeg",
			buffer: undefined,
		},
		{
			fieldname: "imageFiles",
			originalname: "grapes.jpg",
			mimetype: "image/jpeg",
			buffer: undefined,
		},
		{
			fieldname: "imageFiles",
			originalname: "grow.jpg",
			mimetype: "image/jpeg",
			buffer: undefined,
		},
		{
			fieldname: "imageFiles",
			originalname: "leek.jpg",
			mimetype: "image/jpeg",
			buffer: undefined,
		},
		{
			fieldname: "imageFiles",
			originalname: "lemon.jpg",
			mimetype: "image/jpeg",
			buffer: undefined,
		},
	],
	audioFiles: [
		{
			fieldname: "audioFiles",
			originalname: "airport.m4a",
			mimetype: "audio/x-m4a",
			buffer: undefined,
		},
		{
			fieldname: "audioFiles",
			originalname: "fig.m4a",
			mimetype: "audio/x-m4a",
			buffer: undefined,
		},
		{
			fieldname: "audioFiles",
			originalname: "flower.m4a",
			mimetype: "audio/x-m4a",
			buffer: undefined,
		},
		{
			fieldname: "audioFiles",
			originalname: "fungus.m4a",
			mimetype: "audio/x-m4a",
			buffer: undefined,
		},
		{
			fieldname: "audioFiles",
			originalname: "grapes.m4a",
			mimetype: "audio/x-m4a",
			buffer: undefined,
		},
		{
			fieldname: "audioFiles",
			originalname: "grow.m4a",
			mimetype: "audio/x-m4a",
			buffer: undefined,
		},
		{
			fieldname: "audioFiles",
			originalname: "leek.m4a",
			mimetype: "audio/x-m4a",
			buffer: undefined,
		},
		{
			fieldname: "audioFiles",
			originalname: "lemon.m4a",
			mimetype: "audio/x-m4a",
			buffer: undefined,
		},
	],
};

const joinedTestObject = {
	airport: {
		imageFiles: {
			fieldname: "imageFiles",
			originalname: "airport.jpg",
			mimetype: "image/jpeg",
		},
		audioFiles: {
			fieldname: "audioFiles",
			originalname: "airport.m4a",
			mimetype: "audio/x-m4a",
		},
	},
	fig: {
		imageFiles: {
			fieldname: "imageFiles",
			originalname: "fig.jpg",
			mimetype: "image/jpeg",
		},
		audioFiles: {
			fieldname: "audioFiles",
			originalname: "fig.m4a",
			mimetype: "audio/x-m4a",
		},
	},
	flower: {
		imageFiles: {
			fieldname: "imageFiles",
			originalname: "flower.jpg",
			mimetype: "image/jpeg",
		},
		audioFiles: {
			fieldname: "audioFiles",
			originalname: "flower.m4a",
			mimetype: "audio/x-m4a",
		},
	},
	fungus: {
		imageFiles: {
			fieldname: "imageFiles",
			originalname: "fungus.jpg",
			mimetype: "image/jpeg",
		},
		audioFiles: {
			fieldname: "audioFiles",
			originalname: "fungus.m4a",
			mimetype: "audio/x-m4a",
		},
	},
	grapes: {
		imageFiles: {
			fieldname: "imageFiles",
			originalname: "grapes.jpg",
			mimetype: "image/jpeg",
		},
		audioFiles: {
			fieldname: "audioFiles",
			originalname: "grapes.m4a",
			mimetype: "audio/x-m4a",
		},
	},
	grow: {
		imageFiles: {
			fieldname: "imageFiles",
			originalname: "grow.jpg",
			mimetype: "image/jpeg",
		},
		audioFiles: {
			fieldname: "audioFiles",
			originalname: "grow.m4a",
			mimetype: "audio/x-m4a",
		},
	},
	leek: {
		imageFiles: {
			fieldname: "imageFiles",
			originalname: "leek.jpg",
			mimetype: "image/jpeg",
		},
		audioFiles: {
			fieldname: "audioFiles",
			originalname: "leek.m4a",
			mimetype: "audio/x-m4a",
		},
	},
	lemon: {
		imageFiles: {
			fieldname: "imageFiles",
			originalname: "lemon.jpg",
			mimetype: "image/jpeg",
		},
		audioFiles: {
			fieldname: "audioFiles",
			originalname: "lemon.m4a",
			mimetype: "audio/x-m4a",
		},
	},
};

describe("joinByFilenames(fields, files)", () => {
	test("returns object joined by file name", () =>
		expect(FilesHelper.joinByFilenames(fields, testObject)).toMatchObject(
			joinedTestObject
		));

	test("returns the same object if fields is undefined", () =>
		expect(FilesHelper.joinByFilenames([], testObject)).toMatchObject(
			testObject
		));

	test("returns the same object if fields is empty", () =>
		expect(FilesHelper.joinByFilenames([], testObject)).toMatchObject(
			testObject
		));
});
