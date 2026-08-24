document.querySelectorAll(".cert-document-card").forEach(card => {

    const pointer = card.querySelector(".cert-pointer");

    card.addEventListener("mousemove", event => {

      const rect = card.getBoundingClientRect();

      pointer.style.left = `${event.clientX - rect.left}px`;
      pointer.style.top = `${event.clientY - rect.top}px`;

    });

  });