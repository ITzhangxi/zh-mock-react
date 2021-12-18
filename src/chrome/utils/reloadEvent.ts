export const reloadEvent = (cb: (e?: Event) => void) => {
  const eventSource: EventSource = new EventSource(
    `http://${process.env.reloadHost}:${process.env.reloadPort}/reload`
  );

  eventSource.addEventListener(process.env.reloadEvent, function (e: Event) {
    cb(e);
  });
};
