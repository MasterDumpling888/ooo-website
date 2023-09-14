// script.js

// Function to create lines and animate .member elements (except the last one)
function createLinesAndAnimateMembers() {
  const members = document.querySelectorAll('.member:not(:last-child)');

  members.forEach((member) => {
    const img = member.querySelector('.profile-img');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            member.style.opacity = '1';
            member.style.transform = 'translateY(0)';
          } else {

            // Reset the .member transition
            member.style.opacity = '0';
            member.style.transform = 'translateY(20px)';
          }
        });
      },
      {
        threshold: 0.75,
      }
    );
    observer.observe(member);
  });
}

// Call the createLinesAndAnimateMembers function
createLinesAndAnimateMembers();