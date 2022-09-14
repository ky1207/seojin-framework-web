
export default (ctx, inject) => {
  const notify = {
    _sendNotify: (data) => {
      ctx.store.dispatch('showNotify', data)
    },

    success: (message) => {
      notify._sendNotify({ content: message, type: 'success' })
    },

    error: (message) => {
      notify._sendNotify({ content: message, type: 'error' })
    },

    warning: (message) => {
      notify._sendNotify({ content: message, type: 'warning' })
    },

    info: (message) => {
      notify._sendNotify({ content: message, type: 'info' })
    }
  }

  ctx.$notify = notify
  inject('notify', notify)
}
