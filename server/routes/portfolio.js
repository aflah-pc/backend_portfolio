import express from 'express';
import { getDbConnection } from '../database.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/portfolio
// Public endpoint to get all data at once
router.get('/', async (req, res) => {
  try {
    const db = await getDbConnection();

    // Fetch settings and shape as object
    const settingsRows = await db.all('SELECT * FROM settings');
    const personalInfo = {};
    settingsRows.forEach(row => {
      personalInfo[row.key] = row.value;
    });

    // Fetch all other datasets
    const skills = await db.all('SELECT * FROM skills');
    const projects = await db.all('SELECT * FROM projects');
    const certifications = await db.all('SELECT * FROM certifications');
    const education = await db.all('SELECT * FROM education');
    const achievements = await db.all('SELECT * FROM achievements');

    // Group skills by category for convenience (or send raw and let frontend group)
    return res.json({
      status: 'success',
      data: {
        personalInfo,
        skills,
        projects,
        certifications,
        education,
        achievements
      }
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});

// PUT /api/portfolio/settings
// Update contact and general profile info
router.put('/settings', verifyAdminToken, async (req, res) => {
  const settings = req.body;
  if (!settings || typeof settings !== 'object') {
    return res.status(400).json({ status: 'error', message: 'Invalid settings payload.' });
  }

  try {
    const db = await getDbConnection();
    await db.run('BEGIN TRANSACTION');
    
    for (const [key, value] of Object.entries(settings)) {
      await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, String(value)]);
    }

    await db.run('COMMIT');
    return res.json({ status: 'success', message: 'Settings updated successfully.' });
  } catch (error) {
    console.error('Error updating settings:', error);
    try {
      const db = await getDbConnection();
      await db.run('ROLLBACK');
    } catch (_) {}
    return res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});

/* ==========================================================================
   SKILLS ENDPOINTS
   ========================================================================== */

router.post('/skills', verifyAdminToken, async (req, res) => {
  const { category, name, percentage, icon } = req.body;
  if (!category || !name || percentage === undefined) {
    return res.status(400).json({ status: 'error', message: 'Required fields: category, name, percentage.' });
  }

  try {
    const db = await getDbConnection();
    const result = await db.run(
      'INSERT INTO skills (category, name, percentage, icon) VALUES (?, ?, ?, ?)',
      [category, name, parseInt(percentage), icon || '']
    );
    return res.status(201).json({ status: 'success', data: { id: result.lastID, category, name, percentage, icon } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

router.put('/skills/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  const { category, name, percentage, icon } = req.body;

  try {
    const db = await getDbConnection();
    const existing = await db.get('SELECT * FROM skills WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Skill not found.' });
    }

    await db.run(
      'UPDATE skills SET category = ?, name = ?, percentage = ?, icon = ? WHERE id = ?',
      [
        category !== undefined ? category : existing.category,
        name !== undefined ? name : existing.name,
        percentage !== undefined ? parseInt(percentage) : existing.percentage,
        icon !== undefined ? icon : existing.icon,
        id
      ]
    );

    return res.json({ status: 'success', message: 'Skill updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

router.delete('/skills/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;

  try {
    const db = await getDbConnection();
    const existing = await db.get('SELECT * FROM skills WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Skill not found.' });
    }

    await db.run('DELETE FROM skills WHERE id = ?', [id]);
    return res.json({ status: 'success', message: 'Skill deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

/* ==========================================================================
   PROJECTS ENDPOINTS
   ========================================================================== */

router.post('/projects', verifyAdminToken, async (req, res) => {
  const { title, description, technologies, image, github, liveDemo } = req.body;
  if (!title || !description) {
    return res.status(400).json({ status: 'error', message: 'Required fields: title, description.' });
  }

  try {
    const db = await getDbConnection();
    const result = await db.run(
      'INSERT INTO projects (title, description, technologies, image, github, liveDemo) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, technologies || '', image || '', github || '#', liveDemo || '#']
    );
    return res.status(201).json({ status: 'success', data: { id: result.lastID, title, description, technologies, image, github, liveDemo } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

router.put('/projects/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, technologies, image, github, liveDemo } = req.body;

  try {
    const db = await getDbConnection();
    const existing = await db.get('SELECT * FROM projects WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Project not found.' });
    }

    await db.run(
      'UPDATE projects SET title = ?, description = ?, technologies = ?, image = ?, github = ?, liveDemo = ? WHERE id = ?',
      [
        title !== undefined ? title : existing.title,
        description !== undefined ? description : existing.description,
        technologies !== undefined ? technologies : existing.technologies,
        image !== undefined ? image : existing.image,
        github !== undefined ? github : existing.github,
        liveDemo !== undefined ? liveDemo : existing.liveDemo,
        id
      ]
    );

    return res.json({ status: 'success', message: 'Project updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

router.delete('/projects/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;

  try {
    const db = await getDbConnection();
    const existing = await db.get('SELECT * FROM projects WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Project not found.' });
    }

    await db.run('DELETE FROM projects WHERE id = ?', [id]);
    return res.json({ status: 'success', message: 'Project deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

/* ==========================================================================
   CERTIFICATIONS ENDPOINTS
   ========================================================================== */

router.post('/certifications', verifyAdminToken, async (req, res) => {
  const { title, issuer, date, status, link } = req.body;
  if (!title || !issuer) {
    return res.status(400).json({ status: 'error', message: 'Required fields: title, issuer.' });
  }

  try {
    const db = await getDbConnection();
    const result = await db.run(
      'INSERT INTO certifications (title, issuer, date, status, link) VALUES (?, ?, ?, ?, ?)',
      [title, issuer, date || '', status || '', link || '#']
    );
    return res.status(201).json({ status: 'success', data: { id: result.lastID, title, issuer, date, status, link } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

router.put('/certifications/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  const { title, issuer, date, status, link } = req.body;

  try {
    const db = await getDbConnection();
    const existing = await db.get('SELECT * FROM certifications WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Certification not found.' });
    }

    await db.run(
      'UPDATE certifications SET title = ?, issuer = ?, date = ?, status = ?, link = ? WHERE id = ?',
      [
        title !== undefined ? title : existing.title,
        issuer !== undefined ? issuer : existing.issuer,
        date !== undefined ? date : existing.date,
        status !== undefined ? status : existing.status,
        link !== undefined ? link : existing.link,
        id
      ]
    );

    return res.json({ status: 'success', message: 'Certification updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

router.delete('/certifications/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;

  try {
    const db = await getDbConnection();
    const existing = await db.get('SELECT * FROM certifications WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Certification not found.' });
    }

    await db.run('DELETE FROM certifications WHERE id = ?', [id]);
    return res.json({ status: 'success', message: 'Certification deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

/* ==========================================================================
   EDUCATION ENDPOINTS
   ========================================================================== */

router.post('/education', verifyAdminToken, async (req, res) => {
  const { degree, institution, year, cgpa, description } = req.body;
  if (!degree || !institution) {
    return res.status(400).json({ status: 'error', message: 'Required fields: degree, institution.' });
  }

  try {
    const db = await getDbConnection();
    const result = await db.run(
      'INSERT INTO education (degree, institution, year, cgpa, description) VALUES (?, ?, ?, ?, ?)',
      [degree, institution, year || '', cgpa || '', description || '']
    );
    return res.status(201).json({ status: 'success', data: { id: result.lastID, degree, institution, year, cgpa, description } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

router.put('/education/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  const { degree, institution, year, cgpa, description } = req.body;

  try {
    const db = await getDbConnection();
    const existing = await db.get('SELECT * FROM education WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Education record not found.' });
    }

    await db.run(
      'UPDATE education SET degree = ?, institution = ?, year = ?, cgpa = ?, description = ? WHERE id = ?',
      [
        degree !== undefined ? degree : existing.degree,
        institution !== undefined ? institution : existing.institution,
        year !== undefined ? year : existing.year,
        cgpa !== undefined ? cgpa : existing.cgpa,
        description !== undefined ? description : existing.description,
        id
      ]
    );

    return res.json({ status: 'success', message: 'Education record updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

router.delete('/education/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;

  try {
    const db = await getDbConnection();
    const existing = await db.get('SELECT * FROM education WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Education record not found.' });
    }

    await db.run('DELETE FROM education WHERE id = ?', [id]);
    return res.json({ status: 'success', message: 'Education record deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

/* ==========================================================================
   ACHIEVEMENTS ENDPOINTS
   ========================================================================== */

router.post('/achievements', verifyAdminToken, async (req, res) => {
  const { title, description, icon } = req.body;
  if (!title || !description) {
    return res.status(400).json({ status: 'error', message: 'Required fields: title, description.' });
  }

  try {
    const db = await getDbConnection();
    const result = await db.run(
      'INSERT INTO achievements (title, description, icon) VALUES (?, ?, ?)',
      [title, description, icon || 'FaCode']
    );
    return res.status(201).json({ status: 'success', data: { id: result.lastID, title, description, icon } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

router.put('/achievements/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, icon } = req.body;

  try {
    const db = await getDbConnection();
    const existing = await db.get('SELECT * FROM achievements WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Achievement not found.' });
    }

    await db.run(
      'UPDATE achievements SET title = ?, description = ?, icon = ? WHERE id = ?',
      [
        title !== undefined ? title : existing.title,
        description !== undefined ? description : existing.description,
        icon !== undefined ? icon : existing.icon,
        id
      ]
    );

    return res.json({ status: 'success', message: 'Achievement updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

router.delete('/achievements/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;

  try {
    const db = await getDbConnection();
    const existing = await db.get('SELECT * FROM achievements WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'Achievement not found.' });
    }

    await db.run('DELETE FROM achievements WHERE id = ?', [id]);
    return res.json({ status: 'success', message: 'Achievement deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database error.' });
  }
});

export default router;
