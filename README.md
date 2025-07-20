# BioLink Therapeutics - Unified Healthcare Customer Journey Analytics

A comprehensive demonstration of unified customer data platform capabilities for healthcare organizations, showcasing how Segment's Customer Data Platform transforms fragmented patient and HCP interactions into actionable customer intelligence.

## 🏥 About BioLink Therapeutics

BioLink Therapeutics is a fictional biotechnology company specializing in rare disease treatments. This application demonstrates a complete healthcare customer journey from anonymous visitor to treatment success, unified through Segment's CDP.

### Key Therapies
- **BioLink-GTx**: Gene therapy for lysosomal storage disorders
- **BioLink-ENZ**: Enzyme replacement therapy for metabolic disorders

## 🎯 Demo Overview

This application showcases the complete healthcare customer journey across multiple touchpoints:

### 🔄 Customer Journey Stages
1. **Anonymous Discovery** - Website browsing, content consumption
2. **Information Gathering** - Resource downloads, specialist searches
3. **Account Creation** - Patient portal registration
4. **Assessment & Testing** - Treatment eligibility evaluation
5. **Treatment Approval** - Insurance verification, care coordination
6. **Ongoing Care** - Treatment monitoring, outcome tracking

### 👥 User Types Demonstrated
- **Patients** - Treatment seekers and current patients
- **Healthcare Professionals (HCPs)** - Specialists and referring physicians
- **Clinical Trial Participants** - Research study volunteers
- **Anonymous Visitors** - Unidentified website users

## 🚀 Key Features

### 📊 Real-time Analytics Dashboards
- **Executive Dashboard** - High-level KPIs and business metrics
- **Customer 360°** - Unified customer profiles across all touchpoints
- **Patient Analytics** - Journey mapping and outcome tracking
- **HCP Analytics** - Professional engagement and education metrics
- **Clinical Trials** - Enrollment and compliance monitoring

### 🎭 Interactive User Personas
- **Sarah M.** - Adult patient on BioLink-GTx therapy
- **Emma L.** - Pediatric patient (via parent) starting treatment
- **Dr. Johnson** - Pediatric geneticist with active referrals
- **Dr. Martinez** - Endocrinologist evaluating therapies

### 🔧 Admin Tools
- **Live User Profile Tab** - Real-time customer data updates
- **Event Generation** - Simulate realistic user interactions
- **Settings Dashboard** - Demo configuration and data management

## 🛠 Technical Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for data visualization
- **Lucide React** for icons

### Analytics & Data
- **Segment Analytics.js** - Customer data collection
- **Real-time event tracking** - Live user behavior monitoring
- **Profile API integration** - Dynamic customer profile updates
- **Marketing attribution** - UTM parameter tracking

### Deployment
- **Vite** build system
- **Netlify** hosting
- **Environment variables** for configuration

## 🎮 Demo Scenarios

### 1. Anonymous User Journey
```javascript
// Generate realistic 6-week browsing history
- 47 Page Views across disease information, symptoms, treatments
- 8 Content Downloads (guides, trackers, resources)
- 3 Specialist Searches in Boston area
- Realistic engagement metrics (time on page, scroll depth)
```

### 2. Patient Registration & Login
```javascript
// Mock patient emails for demo
sarah.m@email.com     // Sarah M. - BioLink-GTx ongoing care
emma.l@email.com      // Emma L. - Pediatric patient starting treatment
michael.r@email.com   // Michael R. - BioLink-ENZ assessment
david.l@email.com     // David L. - Genetic testing phase
```

### 3. HCP Engagement
```javascript
// Healthcare professional interactions
- Educational content consumption
- Medical information requests
- Patient referral submissions
- Webinar registrations
```

### 4. Clinical Trial Participation
```javascript
// Research study engagement
- Trial screening and consent
- Digital biomarker collection
- Compliance monitoring
- Outcome reporting
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd biolink-therapeutics

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
```bash
# Segment Analytics Configuration
VITE_SEGMENT_WRITE_KEY=your_segment_write_key

# Optional: Backend API for real profile data
VITE_BACKEND_URL=your_backend_api_url
```

## 📱 Key Pages & Features

### Public Website
- **Homepage** - Hero section with therapy overview
- **Disease Information** - Educational content about rare diseases
- **Specialist Locator** - Find healthcare professionals
- **Patient Support** - Resources and assistance programs
- **Clinical Trials** - Research study information

### Patient Portal
- **Registration/Login** - Account creation and authentication
- **Dashboard** - Treatment progress and appointments
- **Assessment** - Eligibility evaluation forms
- **Resource Library** - Educational materials and guides

### HCP Portal
- **Professional Login** - Healthcare provider authentication
- **Clinical Resources** - Medical information and data
- **Education Center** - Training materials and webinars
- **Patient Referrals** - Treatment referral system

### Analytics Dashboards
- **Executive View** - Business KPIs and performance metrics
- **Customer 360°** - Unified customer profiles
- **Journey Analytics** - Patient pathway analysis
- **Real-time Activity** - Live event monitoring

## 🎯 Segment Integration

### Event Tracking
```javascript
// Page views with rich context
analytics.page('Disease Information', {
  page_name: 'biolink-gtx-overview',
  therapy_focus: 'BioLink-GTx',
  device_type: 'desktop'
});

// User actions with detailed properties
analytics.track('Specialist Appointment Requested', {
  doctor_name: 'Dr. Sarah Chen',
  specialty: 'Pediatric Genetics',
  appointment_date: '2024-02-15',
  therapy_interest: 'BioLink-GTx'
});

// User identification with comprehensive profiles
analytics.identify('patient_sarah_m_hashed', {
  name: 'Sarah M.',
  therapy_program: 'BioLink-GTx',
  journey_stage: 'Ongoing Care',
  age_range: '30-35'
});
```

### Marketing Attribution
- **UTM parameter capture** - Campaign source tracking
- **Cross-session persistence** - Attribution across visits
- **Profile enrichment** - Marketing data in customer profiles

## 🎨 Design System

### Color Palette
- **Primary Teal** - #2C7873 (BioLink brand)
- **Secondary Orange** - #E67E22 (BioLink accent)
- **Success Green** - #10B981
- **Warning Orange** - #F59E0B
- **Error Red** - #EF4444

### Typography
- **Font Family** - Inter (system fallback)
- **Headings** - Bold weights with proper hierarchy
- **Body Text** - Regular weight with 150% line height

### Components
- **Responsive design** - Mobile-first approach
- **Accessibility** - WCAG compliant interactions
- **Animations** - Subtle micro-interactions
- **Loading states** - Skeleton screens and spinners

## 📊 Analytics Events Reference

### Core Events
- `Page Viewed` - Website navigation tracking
- `Signed Up` - Account registration
- `Signed In` - User authentication
- `Application Opened` - Portal access

### Healthcare-Specific Events
- `Treatment Eligibility Assessment Started/Completed`
- `Specialist Appointment Requested/Scheduled`
- `Patient Reported Outcome Survey Completed`
- `Clinical Trial Consent Completed`
- `Educational Content Viewed`
- `Medical Information Request`

### User Properties
- `therapy_program` - Treatment interest/enrollment
- `journey_stage` - Current position in care pathway
- `user_type` - patient, hcp, admin
- `specialty` - Medical specialty (for HCPs)
- `age_range` - Demographic segmentation

## 🔒 Privacy & Compliance

### Data Protection
- **HIPAA-compliant design** - Healthcare data protection
- **Anonymized user IDs** - Privacy-preserving identification
- **Consent management** - Explicit user permissions
- **Secure transmission** - Encrypted data transfer

### Demo Data
- **Fictional patients** - No real health information
- **Mock scenarios** - Realistic but simulated journeys
- **Safe testing** - No actual medical data exposure

## 🎪 Demo Instructions

### For Sales Presentations
1. **Start with anonymous journey** - Show rich behavioral data
2. **Demonstrate identity resolution** - Anonymous to identified transition
3. **Highlight unified profiles** - Complete customer view
4. **Show real-time updates** - Live data synchronization

### For Technical Demos
1. **Open Profile Tab** - Show live data updates
2. **Navigate different personas** - Switch between user types
3. **Generate events** - Use admin tools for live data
4. **Explore dashboards** - Analytics and insights

### For Healthcare Audiences
1. **Focus on patient journey** - Care pathway optimization
2. **HCP engagement** - Professional education tracking
3. **Clinical trials** - Research participant monitoring
4. **Compliance & outcomes** - Treatment effectiveness

## 🚀 Deployment

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Netlify Deployment
- **Automatic builds** - Connected to Git repository
- **Environment variables** - Configured in Netlify dashboard
- **Custom domain** - Optional branded URL
- **SSL certificate** - Automatic HTTPS

## 🤝 Contributing

### Development Workflow
1. **Feature branches** - Create from main
2. **Code review** - Pull request process
3. **Testing** - Manual QA and user testing
4. **Documentation** - Update README and comments

### Code Standards
- **TypeScript** - Strict type checking
- **ESLint** - Code quality enforcement
- **Prettier** - Consistent formatting
- **Component structure** - Modular architecture

## 📞 Support

### Demo Support
- **Technical issues** - Check browser console for errors
- **Data questions** - Review analytics implementation
- **Feature requests** - Submit enhancement ideas

### Segment Integration
- **Event tracking** - Verify analytics.js implementation
- **Profile API** - Check backend connectivity
- **Data quality** - Monitor event validation

## 📄 License

This is a demonstration application created for showcasing Segment's Customer Data Platform capabilities in healthcare contexts. All patient data is fictional and created for demo purposes only.

---

**Built with ❤️ for healthcare customer intelligence**

*Transforming fragmented healthcare interactions into unified customer journeys*