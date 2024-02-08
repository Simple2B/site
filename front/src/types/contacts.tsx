export interface ISocialLink {
  id: number;
  link: string;
  icon: string;
  tooltip: string;
  disabled: boolean;
}

export const socialLinks: ISocialLink[] = [
  {
    id: 1,
    link: 'https://www.linkedin.com/company/simple2b',
    icon: 'linkedin',
    tooltip: 'linkedin',
    disabled: false,
  },
  {
    id: 2,
    link: 'https://www.facebook.com/Simple2B-109300384066487',
    icon: 'facebook',
    tooltip: 'facebook',
    disabled: false,
  },
  {
    id: 3,
    link: '#',
    icon: 'twitter',
    tooltip: 'twitter',
    disabled: true,
  },
  {
    id: 4,
    link: 'https://www.upwork.com/ag/simple2b/',
    icon: 'upwork',
    tooltip: 'upWork',
    disabled: false,
  },
  {
    id: 5,
    link: '#',
    icon: 'telegram',
    tooltip: 'telegram',
    disabled: true,
  },
];

export const email = {
  link: 'mailto:simple2b.info@gmail.com',
  text: 'simple2b.info@gmail.com',
};
export const telegram = { link: '#', text: '@Simple2BBot' };
export const phone = { link: 'tel:+4916091894997', text: '+49 160 918 94 997' };
export const address = { city: 'Kyiv', street: 'Stepana Bandery Ave, 6' };
export const germanyAddress = { country: 'Deutschland', city: '91126 Rednitzhembach', street: 'Schützenstraße, 8' };
