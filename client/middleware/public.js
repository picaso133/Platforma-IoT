export default function ({ app, redirect }) {
    if (app.$cookiz.get('token')) {
      return redirect('/')
    }
}