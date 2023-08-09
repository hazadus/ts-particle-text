# TypeScript Particle Text

Particle text animation using TypeScript and HTML Canvas.

Check out live demo at https://hazadus.github.io/ts-particle-text/.

![Screensot](/screenshots/screenshot.png)

## Features

- Convert input text into particles and create cool animation effects.
- Hold left mouse button pressed and move the pointer around the canvas to create another effect!
- Smooth FPS counter.
- Browser window resizing handled.
- Auto deploy project on GitHub Pages on each `git push` to main.

## References

- [Vite - Getting Started](https://vitejs.dev/guide/#getting-started)
- [Vite - Deploy a Static Site on GitHub Pages](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [Particle Text with Vanilla JavaScript](https://www.youtube.com/watch?v=2F2t1RJoGt8)
- Font - [Rubik Wet Paint](https://fonts.google.com/specimen/Rubik+Wet+Paint?subset=cyrillic)

## Notes

How `Particle.angle` is calculated in `Particle.update()` method:

- [MDN - Math.atan2()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)

![Screenshot1](/screenshots/particle.angle.png)
