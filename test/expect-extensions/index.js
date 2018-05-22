function expectArrayOfMatchingObjects(array, object) {
  array.forEach(item => {
    expect(item).toMatchObject(object)
  })
}

module.exports = { expectArrayOfMatchingObjects }
