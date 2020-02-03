const displayTextForContribution = contribution => {
  switch (contribution) {
    case 'MI':
      return 'Partial Contributor';
    case 'MA':
      return 'Major Contributor';
    case 'DR':
      return 'Derisking Contributor';
    default:
      return contribution;
  }
};

export default displayTextForContribution;
