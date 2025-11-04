/*
  # Seed Injury Data for Freedom Leg Conditions
  
  ## Overview
  This migration populates the injuries table with 15 common conditions treated by Freedom Leg.
  
  ## Data Inserted
  - 15 injury records covering foot, ankle, lower leg, and knee conditions
  - Each record includes medical and common names, descriptions, recovery durations
  - Optimized search keywords for SEO and user search functionality
  - All records set to active with appropriate display ordering
  
  ## Categories
  - Foot & Ankle: 6 conditions (fractures, Achilles rupture, bunionectomy, fusion, wounds, neuromas)
  - Lower Leg: 3 conditions (tibial fractures, amputation)
  - Knee: 4 conditions (femoral fracture, patellar fracture, microfracture, osteotomies)
  - Other: 2 conditions (stress fractures, soft tissue injuries)
  
  ## Notes
  - UUIDs are preserved from source data for consistency
  - All conditions marked as suitable for Freedom Leg (freedom_leg_suitable = true)
  - Search keywords include common misspellings and variations for better discoverability
*/

-- Insert all 15 injury records
INSERT INTO injuries (
  id, injury_name, common_name, slug, category, body_region, 
  short_description, non_weight_bearing_duration, freedom_leg_suitable,
  key_benefit_one_liner, search_keywords, is_active, display_order,
  created_at, updated_at
) VALUES
  (
    'c9f80f5c-7d2b-4e36-977e-f3388fa5e2c5',
    'Fractures of the Foot and Ankle',
    'Foot or Ankle Breaks',
    'foot-ankle-fractures',
    'foot-ankle',
    'multiple',
    'Broken bones in the foot or ankle requiring complete off-loading during healing.',
    '6-8 weeks',
    true,
    'Walk hands-free while keeping all weight off your healing foot or ankle',
    ARRAY['foot fracture','ankle fracture','broken foot','broken ankle','foot break','ankle break'],
    true,
    1,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    '6d8608fa-4d63-454f-a78d-cf7ae21d172a',
    'Achilles Tendon Rupture',
    'Achilles Tear or Rupture',
    'achilles-rupture',
    'foot-ankle',
    'ankle',
    'Complete or partial tear of the Achilles tendon connecting the calf to the heel.',
    '6-12 weeks',
    true,
    'Maintain mobility during Achilles recovery without stress on the tendon',
    ARRAY['achilles tear','achilles rupture','torn achilles','ruptured achilles','achilles tendon injury'],
    true,
    2,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    '83431b62-c17d-4ad9-a7f5-2311b4e1e637',
    'Bunionectomy',
    'Bunion Removal Surgery',
    'bunionectomy',
    'foot-ankle',
    'foot',
    'Surgical correction of a bunion requiring non-weight bearing during initial healing.',
    '4-6 weeks',
    true,
    'Stay mobile after bunion surgery while protecting your surgical site',
    ARRAY['bunion surgery','bunion removal','bunion operation','bunion correction'],
    true,
    3,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    'cbfee882-1fa6-419f-939b-5952356db88b',
    'Foot or Ankle Fusion',
    'Ankle or Foot Fusion Surgery',
    'foot-ankle-fusion',
    'foot-ankle',
    'multiple',
    'Surgical fusion of joints in the foot or ankle requiring extended non-weight bearing.',
    '8-12 weeks',
    true,
    'Maintain independence during the long fusion healing process',
    ARRAY['ankle fusion','foot fusion','arthrodesis','joint fusion surgery'],
    true,
    4,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    '307f0013-d100-463e-b6b4-7a6a38ce9509',
    'Plantar Wounds',
    'Foot Wounds or Ulcers',
    'plantar-wounds',
    'foot-ankle',
    'foot',
    'Open wounds on the bottom of the foot requiring complete pressure relief.',
    'Varies by wound',
    true,
    'Complete off-loading allows plantar wounds to heal without pressure',
    ARRAY['foot wound','foot ulcer','plantar ulcer','diabetic foot wound','foot sore'],
    true,
    5,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    'ea3329a1-f9cb-4f77-9185-3e3cf3b62614',
    'Proximal Tibial Fractures',
    'Upper Shinbone Breaks',
    'proximal-tibial-fractures',
    'lower-leg',
    'lower-leg',
    'Fractures near the top of the tibia (shinbone) close to the knee joint.',
    '8-12 weeks',
    true,
    'Keep weight completely off your upper shin fracture while staying active',
    ARRAY['tibia fracture','shin fracture','tibial fracture','broken tibia','broken shin'],
    true,
    6,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    'e1c3e5e1-d450-40fe-a12c-1ad455d1daed',
    'Midshaft Tibial Fractures',
    'Mid-Shinbone Breaks',
    'midshaft-tibial-fractures',
    'lower-leg',
    'lower-leg',
    'Fractures in the middle section of the tibia (shinbone).',
    '8-12 weeks',
    true,
    'Walk freely while your shin fracture heals with complete weight protection',
    ARRAY['tibia fracture','shin fracture','tibial shaft fracture','broken tibia'],
    true,
    7,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    'ee0ba0b9-9b9b-44bb-b293-d531c6057150',
    'Post-Operative Neuromas',
    'Post-Surgery Nerve Pain',
    'post-op-neuromas',
    'foot-ankle',
    'foot',
    'Nerve pain following foot surgery requiring pressure relief.',
    '4-8 weeks',
    true,
    'Eliminate pressure on sensitive nerves while maintaining mobility',
    ARRAY['neuroma','nerve pain','post surgery nerve pain','mortons neuroma'],
    true,
    8,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    '8bc34791-ee86-4e3e-a159-d0db7591a886',
    'Femoral Condylar Fracture',
    'Thighbone Fracture Near Knee',
    'femoral-condylar-fracture',
    'knee',
    'knee',
    'Fracture of the femur (thighbone) near the knee joint.',
    '8-12 weeks',
    true,
    'Protect your knee fracture with complete off-loading and hands-free mobility',
    ARRAY['femur fracture','thigh fracture','condyle fracture','knee fracture','femoral fracture'],
    true,
    9,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    'fe69ff5f-c837-4225-a182-19b6009c3c06',
    'Patellar Fractures',
    'Kneecap Breaks',
    'patellar-fractures',
    'knee',
    'knee',
    'Fractures of the patella (kneecap) requiring non-weight bearing.',
    '6-8 weeks',
    true,
    'Keep all weight off your kneecap while moving freely throughout recovery',
    ARRAY['kneecap fracture','patella fracture','broken kneecap','broken patella'],
    true,
    10,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    '6663fc93-4223-4232-906a-e04fe2933810',
    'Microfracture of the Knee',
    'Knee Cartilage Microfracture Surgery',
    'knee-microfracture',
    'knee',
    'knee',
    'Surgical procedure to repair knee cartilage damage requiring strict non-weight bearing.',
    '6-8 weeks',
    true,
    'Protect healing cartilage with complete weight relief during critical recovery',
    ARRAY['microfracture surgery','cartilage repair','knee cartilage surgery'],
    true,
    11,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    '7844c801-0bf7-42d8-9ab8-ea1abd114dcb',
    'Osteotomies',
    'Bone Realignment Surgery',
    'osteotomies',
    'knee',
    'knee',
    'Surgical cutting and realignment of bone to correct deformity or improve joint function.',
    '8-12 weeks',
    true,
    'Support optimal bone healing alignment with complete off-loading',
    ARRAY['osteotomy','bone realignment','tibial osteotomy','knee osteotomy'],
    true,
    12,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    '525ac01a-bdda-4546-8858-4a5cfcffb98f',
    'Below Knee Amputation',
    'Lower Leg Amputation',
    'below-knee-amputation',
    'lower-leg',
    'lower-leg',
    'Amputation below the knee requiring mobility assistance during prosthetic fitting and healing.',
    'Varies',
    true,
    'Bridge the gap between surgery and prosthetic fitting with full mobility',
    ARRAY['bka','amputation','below knee amputation','leg amputation','transtibial amputation'],
    true,
    13,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    '77c89950-7011-4b3c-a985-f730a78e4e34',
    'Stress Fractures',
    'Stress Fractures of Foot, Ankle, or Lower Leg',
    'stress-fractures',
    'other',
    'multiple',
    'Small cracks in bones caused by repetitive stress, common in athletes and active individuals.',
    '4-8 weeks',
    true,
    'Allow stress fractures to heal while maintaining daily activities',
    ARRAY['stress fracture','hairline fracture','bone stress injury'],
    true,
    14,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  ),
  (
    'f124d2cf-e8a7-4d8c-9983-aaead5570284',
    'Soft Tissue Injuries',
    'Severe Sprains, Strains, or Ligament Tears',
    'soft-tissue-injuries',
    'other',
    'multiple',
    'Significant soft tissue damage requiring temporary non-weight bearing for healing.',
    '2-6 weeks',
    true,
    'Protect healing ligaments and tendons while staying mobile',
    ARRAY['sprain','strain','ligament tear','ankle sprain','severe sprain'],
    true,
    15,
    '2025-11-02 22:08:30.570741+00',
    '2025-11-02 22:08:30.570741+00'
  )
ON CONFLICT (id) DO NOTHING;
