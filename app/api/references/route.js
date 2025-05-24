import dbConnect from '../../lib/mongodb';
import Reference from '../../models/Reference';

export async function GET() {
  try {
    await dbConnect();
    const references = await Reference.find({});
    return new Response(JSON.stringify(references), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching references:', error); // Log the error
    return new Response(JSON.stringify({ error: 'Error fetching references' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { reference } = await req.json();
    console.log('Deleting reference:', reference); // Debug log

    const isExisting = await Reference.findOne({ reference });

    if (!isExisting) {
      console.log('Reference does not exist:', reference); // Debug log
      return new Response(JSON.stringify({ error: "La référence n'existe pas" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await Reference.deleteOne({ reference });
    console.log('Reference deleted:', reference); // Debug log

    return new Response(JSON.stringify({ message: 'La référence a été supprimée' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error deleting reference:', error); // Log the error
    return new Response(JSON.stringify({ error: 'Erreur lors de la suppression' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const { reference, quantity } = await req.json();
    console.log('Updating quantity for reference:', reference); // Debug log

    const existingReference = await Reference.findOne({ reference });

    if (!existingReference) {
      console.log('Reference does not exist:', reference); // Debug log
      return new Response(JSON.stringify({ error: "La référence n'existe pas" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    existingReference.quantity = quantity;
    await existingReference.save();
    console.log('Quantity updated for reference:', reference); // Debug log

    return new Response(JSON.stringify({ message: 'La quantité a été mise à jour' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error updating quantity:', error); // Log the error
    return new Response(JSON.stringify({ error: 'Erreur lors de la mise à jour de la quantité' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { reference, price, quantity, designation } = await req.json();
    console.log('Adding reference:', reference); // Debug log

    const existingReference = await Reference.findOne({ reference });

    if (existingReference) {
      console.log('Reference already exists:', reference); // Debug log
      return new Response(JSON.stringify({ error: 'Reference already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newReference = new Reference({ reference, price, quantity, designation });
    await newReference.save();
    console.log('Reference added:', newReference); // Debug log

    return new Response(JSON.stringify(newReference), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding reference:', error); // Log the error
    return new Response(JSON.stringify({ error: 'Error adding reference' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
