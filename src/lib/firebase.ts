// Mock Firebase service since setup was declined
// This maintains the interface for other components but uses local mocks

export const auth = {
  currentUser: null,
  signOut: async () => {
    console.log("Mock Sign Out");
  }
};

export const db = {};

export const signInWithGoogle = async () => {
  console.log("Mock Sign In with Google");
  return { uid: 'demo-user-123', displayName: 'Fantasy Pro' };
};

export const logout = () => {
  console.log("Mock Logout");
};
