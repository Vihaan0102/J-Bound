
// This view has been merged into ProfileView.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const DocumentsView: React.FC = () => {
  return <Navigate to="/profile" replace />;
};

export default DocumentsView;
