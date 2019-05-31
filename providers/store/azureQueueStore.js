// Copyright (c) Microsoft Corporation and others. Licensed under the MIT license.
// SPDX-License-Identifier: MIT

const azure = require('azure-storage')
const base64 = require('base-64')
const { promisify } = require('util')

class AzureStorageQueue {
  constructor(options) {
    this.options = options
    this.logger = options.logger
  }

  async connect() {
    this.queueService = azure
      .createQueueService(this.options.connectionString)
      .withFilter(new azure.LinearRetryPolicyFilter())
    await promisify(this.queueService.createQueueIfNotExists).bind(this.queueService)(this.options.queueName)
  }

  async upsert(document) {
    const message = base64.encode(JSON.stringify(document))
    await promisify(this.queueService.createMessage).bind(this.queueService)(this.options.queueName, message)
  }

  get() {
    return null
  }

  etag() {
    return null
  }

  list() {
    return null
  }

  count() {
    return null
  }

  close() {
    return null
  }

  delete() {
    return null
  }
}

module.exports = options => new AzureStorageQueue(options)